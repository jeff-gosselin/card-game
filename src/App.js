import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import Logo from './components/Logo';
import Controls from './components/Controls';
import Wagers from './components/Wagers';
import Bank from './components/Bank';
import Bet from './components/Bet';
import axios from 'axios';
import './css/App.css';

const baseURL = "https://deckofcardsapi.com/api/deck";

class App extends Component {
	state = {
		deck: null,
		dealerHand: [],
		playerHand: [],
		dealStatus: true,
		standStatus: false,
		bank: 2250,
		bet: 0
	}

	async componentDidMount() {
		let deck = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
		this.setState({
			deck: deck.data
		})
	}

	placeBet(amt) {
		if (amt <= this.state.bank) {
			this.setState({
				bet: this.state.bet + amt,
				bank: this.state.bank - amt
			});
		}

	}

	async deal() {
		if (this.state.bet === 0) {
			alert("Please place bet.");
			return null;
		}
		if (this.state.dealStatus) {
			const id = this.state.deck.deck_id;
			const dealCards = `${baseURL}/${id}/draw/?count=4`;
			let cardResult = await axios.get(dealCards);

			let cards = cardResult.data.cards;

			this.setState({
				playerHand: [
					{id: cards[0].code, image: cards[0].image, name: `${cards[0].value} of ${cards[0].suit}`, value: cards[0].value},
					{id: cards[1].code, image: cards[1].image, name: `${cards[1].value} of ${cards[1].suit}`, value: cards[1].value},
					...this.state.playerHand
				],
				dealerHand: [
					{id: cards[2].code, image: cards[2].image, name: `${cards[2].value} of ${cards[2].suit}`, value: cards[2].value},
					{id: cards[3].code, image: cards[3].image, name: `${cards[3].value} of ${cards[3].suit}`, value: cards[3].value},
					...this.state.dealerHand
				],
				dealStatus: false
			})

		}
	}

	async hitPlayer() {
		if (this.state.playerHand.length < 1) {
			return null;
		}
		const id = this.state.deck.deck_id;
		const drawCard = `${baseURL}/${id}/draw/?count=1`;
		let cardResult = await axios.get(drawCard);
		let card = cardResult.data.cards[0];
		console.log("A card: ", card);
		this.setState({
			playerHand: [{id: card.code, image: card.image, name: `${card.value} of ${card.suit}`, value: card.value}, ...this.state.playerHand]
		})
	}

	async hitDealer() {
		if (this.state.dealerHand.length < 1) {
			return null;
		}
		const id = this.state.deck.deck_id;
		const drawCard = `${baseURL}/${id}/draw/?count=1`;
		let cardResult = await axios.get(drawCard);
		let card = cardResult.data.cards[0];
		console.log("A card: ", card);
		this.setState({
			dealerHand: [{id: card.code, image: card.image, name: `${card.value} of ${card.suit}`, value: card.value}, ...this.state.dealerHand],
			standStatus: true
		})
		let pTotal = this.playerCardTotal();
		let dTotal = this.dealerCardTotal();

		if (dTotal < pTotal || (this.standStatus && dTotal === pTotal && dTotal > 18)) {
			this.hitDealer();
		}
	}

	stand() {
		this.hitDealer();
	}

	playerCardTotal() {
		let num = 0;
		if (this.state.playerHand.length > 0) {
			let cardValues = this.state.playerHand.map(card => {
				if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING" ) {
					num = 10;
				} else if (card.value === "ACE") {
					num = 11;
				} else {
					num = parseInt(card.value);
				}
				return num;
			})

			// Determines the value of an Ace depending on the hand's total value
			if (cardValues.reduce((a,b) => a + b) > 21 && cardValues.includes(11) ) {
				cardValues[cardValues.indexOf(11)] = 1;
			}

			// Totals Player's Hand
			return cardValues.reduce((a,b) => a + b);
		}
	}

	dealerCardTotal() {
		let num = 0;
		if (this.state.dealerHand.length > 0) {
			let cardValues = this.state.dealerHand.map(card => {
				if (card.value === "JACK" || card.value === "QUEEN" || card.value === "KING" ) {
					num = 10;
				} else if (card.value === "ACE") {
					num = 11;
				} else {
					num = parseInt(card.value);
				}
				return num;
			})

			// Determines the value of an Ace depending on the hand's total value
			if (cardValues.reduce((a,b) => a + b) > 21 && cardValues.includes(11) ) {
				cardValues[cardValues.indexOf(11)] = 1;
			}

			// Totals Player's Hand
			return cardValues.reduce((a,b) => a + b);
		}
	}

	gameLogic() {
		if (this.playerCardTotal() > 21 || this.dealerCardTotal() === 21 || (this.state.standStatus &&  this.dealerCardTotal() > this.playerCardTotal()) && this.dealerCardTotal() < 21) {
			alert("Dealer Wins!");
			this.setState({
				dealerHand: [],
				playerHand: [],
				dealStatus: true,
				bet: 0,
				standStatus: false
			})
		}

		if (this.playerCardTotal() === 21 || this.dealerCardTotal() > 21) {
			let winnings = this.state.bet * 2;
			alert("You Win!");
			this.setState({
				dealerHand: [],
				playerHand: [],
				dealStatus: true,
				bank: winnings + this.state.bank,
				bet: 0,
				standStatus: false
			})
		}
	}

	render() {
		console.log("Player Hand: ", this.state.playerHand);
		return (
	    <div className="App">
				<Logo />
				<GameBoard playerHand={this.state.playerHand} dealerHand={this.state.dealerHand} pCardTotal={this.playerCardTotal()} dCardTotal={this.dealerCardTotal()} roundResult={this.gameLogic.bind(this)}/>

				<div className="main-panel">
					<Controls deal={this.deal.bind(this)} hitPlayer={this.hitPlayer.bind(this)} stand={this.stand.bind(this)} />
					<Bet bet={this.state.bet} />
					<Bank bank={this.state.bank} />
				</div>

				<Wagers placeBet={this.placeBet.bind(this)}/>
	    </div>
	  );
	}

}

export default App;
