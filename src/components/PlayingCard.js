import React, { Component } from 'react';
import '../css/PlayingCard.css';

class PlayingCard extends Component {
	render() {

		return (
			<img className="card" src={this.props.image} alt={this.props.name} />
		)
	}
}
 export default PlayingCard;
