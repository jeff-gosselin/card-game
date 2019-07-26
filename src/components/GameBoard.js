import React, { Component } from 'react';
import PlayingCard from './PlayingCard';
import '../css/GameBoard.css'

class GameBoard extends Component {
	render() {

		let drawnCards = this.props.drawn.map(card => <PlayingCard name={card.name} image={card.image} key={card.id} /> );

		return (
			<div>
				<div className="card-table">
					{drawnCards}
				</div>
			</div>
		);
	}
}

export default GameBoard;
