// @flow

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing from './Landing';
import '../public/scss/styles.scss';

const FourOhFour = () => <h1>404</h1>;

class App extends React.Component {
	constructor() {
		super();
		this.state = { data: null };
	}

	render() {
		return (
			<BrowserRouter>
				<Provider>
					<div id="wrapper" className="">
						<div className="app">
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route component={FourOhFour} />
							</Switch>
						</div>
					</div>
				</Provider> 
			</BrowserRouter>
		);
	}
}

export default App;
