import React, { Component } from 'react';

class Extras extends Component {
	render() {
		const extras = ['wd', 'nb', 'b','lb', 'ot'];
		return(
			<div>
				<h1>add extras</h1>
				{
					extras.map((str, index) => {
						return <button key={index}>{str}</button>
					})
				}
			</div>
		)
	}
}

export default Extras;