import React, { Component } from 'react';

class Wickets extends Component {

	render() {
		const wickets = ['bowled', 'caughtOut', 'lbw', 'runout', 'stumped'];		
		return(
			<div className='updatingScore'>
				<h1 className='content is-large'>add wickets</h1>
				{
					// <div className='buttons'>
						wickets.map((typ, index) => {
						return <button className='button is-outlined' key={index}>{typ}</button>
					})
					// </div>
				}
			</div>
		)
	}
}

export default Wickets;