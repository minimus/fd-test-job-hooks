/* @flow */

import React from 'react'
import { Translate, withLocalize } from 'react-localize-redux'
import { useDispatch, useSelector } from 'react-redux'
import { HOME_REMEMBER_ME_CHANGED } from '../../redux/actions'

const HomeLoginRememberControl = () => {
	const rememberMe = useSelector(state => state.home.rememberMe)
	const dispatch = useDispatch()

	const changeRememberMe = event => {
		dispatch({ type: HOME_REMEMBER_ME_CHANGED, payload: event.target.checked })
	}

	return (
		<div>
			<label id="remember-me-label" htmlFor="remember-me">
				<input id="remember-me" type="checkbox" checked={rememberMe} onClick={changeRememberMe} />
				<Translate id="login.rememberMe" />
			</label>
		</div>
	)
}

export default withLocalize(HomeLoginRememberControl)
