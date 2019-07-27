import React, { Component } from 'react';
import '../css/PlayingCard.css';

class PlayingCard extends Component {
	render() {
		let styles = {
    	transform: `translateX(${this.props.pOrder * 20}%)`,
			zIndex: this.props.pOrder
  	};
		return (
			<img style={styles} className="card" src={this.props.image} alt={this.props.name} />
		)
	}
}
 export default PlayingCard;
