import React, { Component } from 'react';
import PlayingCard from './PlayingCard';
import '../css/GameBoard.css'

class GameBoard extends Component {
	render() {
		let playerCards = this.props.playerHand.map((card, i) => <PlayingCard name={card.name} image={card.image} key={card.id} value={card.value} pOrder={this.props.playerHand.length - i} /> );

		let dealerCards = this.props.dealerHand.map((card, i) => <PlayingCard name={card.name} image={card.image} key={card.id} value={card.value} pOrder={this.props.dealerHand.length - i}/> );

		setTimeout(this.props.roundResult, 500);

		return (
			<div>
				{this.props.pCardTotal >= 21 ? console.log("The End") : null}
				<div className="card-table">
					<div className="card-table__player">

							<h2>Player's Hand</h2>
							<div>
								{playerCards}
							</div>
							<h2 className="card-value">{this.props.pCardTotal}</h2>

					</div>
					<div className="card-table__dealer">

							<h2>Dealer's Hand</h2>
							<div>
								{dealerCards}
							</div>
							<h2 className="card-value">{this.props.dCardTotal}</h2>

					</div>
				</div>
			</div>
		);
	}
}

export default GameBoard;
