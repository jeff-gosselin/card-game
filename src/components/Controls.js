import React, { Component } from 'react';

class Controls extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.deal}>Deal</button>
				<button onClick={this.props.hitPlayer}>Hit</button>
				<button onClick={this.props.getCard}>Stand</button>
			</div>
		)
	}
}
export default Controls;
