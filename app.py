import tornado.web
import json
from collections import defaultdict

PORTFOLIO = defaultdict(int)
PORTFOLIO["AYYMD"] = 420
PORTFOLIO["MSFT"] = 69


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Dildos.")

class TestGetHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("More dildos.")

class PortfolioHoldingsGetHandler(tornado.web.RequestHandler):
    def get(self):
        #payload = ""
        #for stock, amount in PORTFOLIO:
        self.write(PORTFOLIO)

class BuyTickerHandler(tornado.web.RequestHandler):
    def post(self):
        payload = json.loads(self.request.body)
        """
            { "ticker": "MSFT", "amount": 123 }
        """
        print(payload)
        ticker = payload["ticker"]
        amount = payload["amount"]
        PORTFOLIO[ticker] += amount
        #payload = ""
        #for stock, amount in PORTFOLIO:
        print(PORTFOLIO)
        self.write(PORTFOLIO)

def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/testGet", TestGetHandler),
        (r"/getPortfolio", PortfolioHoldingsGetHandler),
        (r"/buy", BuyTickerHandler),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
