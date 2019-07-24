import React, { Component } from 'react';

class PlayingCard extends Component {
	render() {
		return (
			<h1>{this.props.type.id}</h1>
		)
	}
}
 export default PlayingCard;
