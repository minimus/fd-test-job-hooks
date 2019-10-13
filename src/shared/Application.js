/* @flow */

import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/home/HomeContainer'

export default function Application(): Node {
	return (
		<article id="main">
			<Switch>
				<Route path="/" component={Home} />
				<Route path="/:latitude/:longitude" component={Home} />
			</Switch>
		</article>
	)
}
