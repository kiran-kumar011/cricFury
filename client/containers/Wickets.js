import React, { Component } from 'react';

class Wickets extends Component {
	render() {
		const wickets = ['bowled', 'caughtOut', 'lbw', 'runout', 'stumped'];		
		return(
			<div>
				<h1>add wickets</h1>
				{
					wickets.map((typ, index) => {
						return <button key={index}>{typ}</button>
					})
				}
			</div>
		)
	}
}

export default Wickets;