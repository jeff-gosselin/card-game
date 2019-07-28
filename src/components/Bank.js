import React, { Component } from 'react';
import '../css/Bank.css';

class Bank extends Component {
	render() {
		return (
			<div className="bank-wrapper">
				<h2>Your Bank</h2>
				<div className="bank">
					<img src="https://img.icons8.com/plasticine/2x/cash-.png" alt="" />
					<h1>{`$${this.props.bank}`}</h1>
				</div>


			</div>
		)
	}
}
export default Bank;
