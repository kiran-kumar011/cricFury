import React, { Component } from 'react';

class Extras extends Component {
	render() {
		const extras = ['wd', 'nb', 'b','lb', 'ot'];
		return(
			<div className='updatingScore'>
				<h1 className='content is-large'>add extras</h1>
				{
					extras.map((str, index) => {
						return <button className='button is-outlined'key={index}>{str}</button>
					})
				}
			</div>
		)
	}
}

export default Extras;