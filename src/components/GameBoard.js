import React, { Component } from 'react';
import PlayingCard from './PlayingCard';
import '../css/GameBoard.css'

class GameBoard extends Component {
	render() {
		let playerCards = this.props.playerHand.map((card, i) => <PlayingCard name={card.name} image={card.image} key={card.id} pOrder={this.props.playerHand.length - i} /> );

		let dealerCards = this.props.dealerHand.map(card => <PlayingCard name={card.name} image={card.image} key={card.id} /> );
		console.log("length: ", this.props.playerHand.length);
		return (
			<div>
				<div className="card-table">
					<div className="card-table__player">
						<h2>Player</h2>
						{playerCards}
					</div>
					<div className="card-table__dealer">
						<h2>Dealer</h2>
						{dealerCards}
					</div>
				</div>
			</div>
		);
	}
}

export default GameBoard;
