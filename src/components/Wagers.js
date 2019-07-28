import React, { Component } from 'react';
import '../css/Wagers.css';

class Wagers extends Component {
	render() {
		return (

				<div className="wagers">
					<button onClick={() => this.props.placeBet(1)}>$1</button>
					<button onClick={() => this.props.placeBet(10)}>$10</button>
					<button onClick={() => this.props.placeBet(100)}>$100</button>
					<button onClick={() => this.props.placeBet(500)}>$500</button>
				</div>

		)
	}
}
export default Wagers;
