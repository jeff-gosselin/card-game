import React, { Component } from 'react';
import '../css/Bet.css';

class Bet extends Component {
	render() {
		return (
			<div className="bet-wrapper">
				<h2>Current Bet</h2>
				<div className="bet">
					<h1>{`$${this.props.bet}`}</h1>
				</div>
			</div>
		)
	}
}
export default Bet;
