import React, { Component } from 'react';
import '../css/PlayingCard.css';

class PlayingCard extends Component {
	render() {
		let styles = {
    	transform: `translateX(${this.props.pOrder * 16}%)`,
			zIndex: this.props.pOrder,
			position: 'absolute'
  	};
		return (
			<img style={styles} className="card" src={this.props.image} alt={this.props.name} />
		)
	}
}
 export default PlayingCard;
