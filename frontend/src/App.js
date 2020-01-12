import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
	const [portfolio, setPortfolio] = useState({});

	const getPortfolio = () => {
		fetch("/getPortfolio")
			.then(r => r.json())
			.then(setPortfolio);
	};

	const buyAMD = () => {
		return fetch("/buy", {
			method: "POST",
			body: JSON.stringify({
				"ticker":"AMD",
				"amount":421
			})
		}).then(console.log)
	};

	setInterval(getPortfolio, 3000);

	return(
		<div>
			<h1>Xx STONKS xX</h1>
			<p style={{"color": "red"}}>Hello world!</p>
			<ul>
			{
				Object.keys(portfolio).map(ticker => (
					<li key={ticker}>{ticker} - {portfolio[ticker]} shares</li>
				))
			}
			</ul>
		</div>
	)
}
export default App;
