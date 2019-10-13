/* @flow */

import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Translate, withLocalize } from 'react-localize-redux'
import LabeledInput from './LabeledInput'
import { HOME_PASSWORD_RECOVERY_SENT, HOME_USERNAME_CHANGED } from '../../redux/actions'

const HomeRecovery = (): Node => {
	const username = useSelector(state => state.home.username)

	const dispatch = useDispatch()
	const trackName = useCallback(
		event => {
			const nickname = event.target.value
			dispatch({ type: HOME_USERNAME_CHANGED, payload: nickname })
		},
		[dispatch],
	)

	const passwordRecoverySent = useCallback(() => {
		dispatch({ type: HOME_PASSWORD_RECOVERY_SENT, payload: false })
	}, [dispatch])

	return (
		<div id="home-component-recovery">
			<h1>
				<Translate id="recovery.header" />
			</h1>
			<LabeledInput handler={trackName} id="username" value={username} />
			<p>
				<Translate id="recovery.help" />
			</p>
			<div className="login-buttons">
				<button id="send-request" className="sign-in-button" type="button" onClick={passwordRecoverySent}>
					<Translate id="recovery.sendRequest" />
				</button>
			</div>
		</div>
	)
}

export default withLocalize(HomeRecovery)
