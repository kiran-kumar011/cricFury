import React, { Component } from 'react';

class Runs extends Component {
	render() {
		const scores = [0, 1, 2, 3, 4, 6];
		return(
			<div>
				<h1>add runs</h1>
				{
					scores.map((num, index) => {
						return <button key={index}>{num}</button>
					})
				}
			</div>
		)
	}
}

export default Runs;