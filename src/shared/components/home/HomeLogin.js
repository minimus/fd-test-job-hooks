import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Translate, withLocalize } from 'react-localize-redux'
import LabeledInput from './LabeledInput'
import RememberControl from './HomeLoginRememberControl'
import HomeLoginButtons from './HomeLoginButtons'
import { HOME_PASSWORD_CHANGED, HOME_USERNAME_CHANGED } from '../../redux/actions'

const HomeLogin = () => {
  const username = useSelector(state => state.home.username)
  const password = useSelector(state => state.home.password)

  const dispatch = useDispatch()

  const trackName = useCallback((event) => {
    const nickname = event.target.value
    dispatch({ type: HOME_USERNAME_CHANGED, payload: nickname })
  }, [dispatch])

  const trackPass = useCallback((event) => {
    const pass = event.target.value
    dispatch({ type: HOME_PASSWORD_CHANGED, payload: pass })
  }, [dispatch])

  return (
    <div id="home-component-login">
      <h1><Translate id="login.header" /></h1>
      <LabeledInput handler={trackName} id="username" value={username} />
      <LabeledInput handler={trackPass} id="password" value={password} pass />
      <RememberControl />
      <HomeLoginButtons />
    </div>
  )
}

export default withLocalize(HomeLogin)
