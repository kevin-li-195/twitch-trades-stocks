import tornado.web
import alpaca_trade_api as tradeapi


keyID = "KEY_ID"
secretKey = "SECRET_KEY"
baseUrl='https://paper-api.alpaca.markets'
apiVer="v2"

api = tradeapi.REST(keyID, secretKey, api_version=apiVer, base_url=baseUrl)
account = api.get_account()
api.list_orders()

#Simple methods for buying and selling 1 share of AMD using /buy and /sell
class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Dildos.")
        self.testOut()

    def testOut(self):
      self.write(" \nStarting Alpaca Functions\r")
      print("Account Status: "+account.status)
      self.write("\nAccount Status: " + account.status)

#Realistically, the buy and the sell can be together. I just kept them separate for testing
class BuyHandler(tornado.web.RequestHandler):
  def get(self):
    self.write("Here is the buy Page!")
    order_list = api.list_orders(status=None, limit=None, after=None, until=None, direction=None)
    print("Current Orders: " + str(order_list))
    self.placeBuyOrder('AMD','1','buy', 'market', 'gtc')

  def placeBuyOrder(self, symbol, qty, side, type, time_in_force):
    newOrder = api.submit_order(symbol, qty, side, type, time_in_force, limit_price=None, stop_price=None, client_order_id=None)
    orderList = api.list_orders(status=None, limit=None, after=None, until=None, direction=None)
    print("New List of Orders: " + str(orderList))

class SellHandler(tornado.web.RequestHandler):
  def get(self):
    self.write("Here is the sell Page!")
    order_list = api.list_orders(status=None, limit=None, after=None, until=None, direction=None)
    print("Current Orders: " + str(order_list))
    self.placeSellOrder('AMD','1','sell', 'market', 'gtc')

  def placeSellOrder(self, symbol, qty, side, type, time_in_force):
    newOrder = api.submit_order(symbol, qty, side, type, time_in_force, limit_price=None, stop_price=None, client_order_id=None)
    orderList = api.list_orders(status=None, limit=None, after=None, until=None, direction=None)
    print("New List of Orders: " + str(orderList))

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/buy", BuyHandler),
        (r"/sell", SellHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()



