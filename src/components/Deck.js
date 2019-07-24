import React, { Component } from 'react';
import axios from 'axios';

const baseURL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
	state = {
		deck: null
	}

	async componentDidMount() {
		let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
		this.setState({
			deck: deck.data
		})
	}

	async getCard() {
		const id = this.state.deck.deck_id;
		const drawCard = `${baseURL}/${id}/draw/?count=1/`;
		let cardResult = await axios.get(drawCard);
		console.log(cardResult);
	}

	render() {
		return (
			<div>
				<h1>Card Dealer Game</h1>
				<button onClick={this.getCard}>Draw Card</button>
			</div>
		);
	}
}

export default Deck;
