import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import InfoBar from './components/InfoBar';
import Controls from './components/Controls';
import axios from 'axios';
import './css/App.css';

const baseURL = "https://deckofcardsapi.com/api/deck";

class App extends Component {
	state = {
		deck: null,
		drawn: [],
		dealerHand: [],
		playerHand: []
	}

	async componentDidMount() {
		let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
		this.setState({
			deck: deck.data
		})
	}

	async hitPlayer() {
		const id = this.state.deck.deck_id;
		const drawCard = `${baseURL}/${id}/draw/?count=1`;
		let cardResult = await axios.get(drawCard);
		let card = cardResult.data.cards[0];
		console.log(card);
		this.setState({
			drawn: [{id: card.code, image: card.image, name: `${card.value} of ${card.suit}`}, ...this.state.drawn]

		})
	}

	async deal() {
		const id = this.state.deck.deck_id;
		const dealCards = `${baseURL}/${id}/draw/?count=4`;
		let cardResult = await axios.get(dealCards);

		let cards = cardResult.data.cards;


		console.log(cards);
		// this.setState({
		// 	drawn: [{id: card.code, image: card.image, name: `${card.value} of ${card.suit}`}, ...this.state.drawn]

		// });
	}

	render() {
		console.log("Remaining: ", this.state.remaining);
		return (
	    <div className="App">
				<InfoBar />
				<GameBoard drawn={this.state.drawn} />
				<Controls deal={this.deal.bind(this)} hitPlayer={this.hitPlayer.bind(this)} />
	    </div>
	  );
	}

}

export default App;
