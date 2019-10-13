/* @flow */

import React, { useCallback } from 'react'
import { Translate, withLocalize } from 'react-localize-redux'
import { useDispatch, useSelector } from 'react-redux'
import { HOME_PASSWORD_RECOVERY_NEEDED, HOME_SIGN_IN, HOME_SIGN_OUT } from '../../redux/actions'

const HomeLoginButtons = (): Node => {
	const loggedIn = useSelector(state => state.home.loggedIn)
	const dispatch = useDispatch()

	const passwordRecoveryNeeded = useCallback(() => {
		dispatch({ type: HOME_PASSWORD_RECOVERY_NEEDED, payload: true })
	}, [dispatch])

	const signIn = () => {
		dispatch({ type: HOME_SIGN_IN, payload: true })
	}

	const signOut = () => {
		dispatch({ type: HOME_SIGN_OUT, payload: false })
	}

	return (
		<div className="login-buttons">
			<button id="sign-in" className="sign-in-button" type="button" onClick={loggedIn ? signOut : signIn}>
				{loggedIn ? <Translate id="login.signOut" /> : <Translate id="login.signIn" />}
			</button>
			<button id="recovery" className="link-button" type="button" onClick={passwordRecoveryNeeded}>
				<Translate id="login.forgotPass" />
			</button>
		</div>
	)
}

export default withLocalize(HomeLoginButtons)
