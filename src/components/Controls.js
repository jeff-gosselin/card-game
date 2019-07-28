import React, { Component } from 'react';
import '../css/Controls.css';

class Controls extends Component {
	render() {
		return (
			<div>
				<div className="controls">
					<button onClick={this.props.deal}>DEAL</button>
					<button onClick={this.props.hitPlayer}>HIT</button>
					<button onClick={this.props.stand}>STAND</button>
				</div>
			</div>
		)
	}
}
export default Controls;
