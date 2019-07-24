import React, { Component } from 'react';
import PlayingCard from './PlayingCard';
import axios from 'axios';

const baseURL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
	state = {
		deck: null,
		drawn: []
	}

	async componentDidMount() {
		let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
		this.setState({
			deck: deck.data
		})
	}

	async getCard() {
		const id = this.state.deck.deck_id;
		console.log("id: ", id);
		const drawCard = `${baseURL}/${id}/draw/?count=1`;
		let cardResult = await axios.get(drawCard);
		let card = cardResult.data.cards[0];
		console.log(card);
		this.setState({
			drawn: [{id: card.code, image: card.image, name: `${card.value} of ${card.suit}`}, ...this.state.drawn]
		});
	}

	render() {
		let num = 52;
		let drawnCards = this.state.drawn.map(card => <PlayingCard type={card} number={num--} /> );

		return (
			<div>
				<h1>Card Dealer Game</h1>
				<h2>{num} remaining</h2>
				<button onClick={this.getCard.bind(this)}>Draw Card!</button>
				<div className="card-table">
					{drawnCards}
				</div>
			</div>
		);
	}
}

export default Deck;
