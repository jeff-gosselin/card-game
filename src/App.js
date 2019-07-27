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
		dealerHand: [],
		playerHand: [],
		dealStatus: true
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
			playerHand: [{id: card.code, image: card.image, name: `${card.value} of ${card.suit}`}, ...this.state.playerHand]
		})
	}

	async deal() {
		if (this.state.dealStatus) {
			const id = this.state.deck.deck_id;
			const dealCards = `${baseURL}/${id}/draw/?count=4`;
			let cardResult = await axios.get(dealCards);

			let cards = cardResult.data.cards;

			this.setState({
				playerHand: [
					{id: cards[0].code[0], image: cards[0].image, name: `${cards[0].value} of ${cards[0].suit}`},
					{id: cards[1].code[1], image: cards[1].image, name: `${cards[1].value} of ${cards[1].suit}`},
					...this.state.playerHand
				],
				dealerHand: [
					{id: cards[2].code[2], image: cards[2].image, name: `${cards[2].value} of ${cards[2].suit}`},
					{id: cards[3].code[3], image: cards[3].image, name: `${cards[3].value} of ${cards[3].suit}`},
					...this.state.dealerHand
				],
				dealStatus: false
			})

		}
	}

	render() {
		console.log("Order # : ", this.state.orderNum);
		return (
	    <div className="App">
				<InfoBar />
				<GameBoard playerHand={this.state.playerHand} pOrder={this.state.playerHand.length} dealerHand={this.state.dealerHand} />
				<Controls deal={this.deal.bind(this)} hitPlayer={this.hitPlayer.bind(this)} />
	    </div>
	  );
	}

}

export default App;
