import { setCookie } from '../helpers'

import {
  HOME_SIGN_OUT, HOME_SIGN_IN, HOME_PASSWORD_RECOVERY_SENT, HOME_PASSWORD_RECOVERY_NEEDED,
  HOME_REMEMBER_ME_CHANGED, HOME_PASSWORD_CHANGED, HOME_USERNAME_CHANGED,
} from '../../actions'

const initialState = {
  username: '',
  password: '',
  rememberMe: false,
  recovery: false,
  locale: 'en',
  loggedIn: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HOME_USERNAME_CHANGED: {
      const username = action.payload
      return { ...state, username }
    }

    case HOME_PASSWORD_CHANGED:
      return { ...state, password: action.payload }

    case HOME_SIGN_IN: {
      const { username, rememberMe } = state
      setCookie(username, rememberMe)
      return { ...state, loggedIn: action.payload }
    }

    case HOME_SIGN_OUT: {
      const { username } = state
      setCookie(username, false)
      return { ...state, loggedIn: action.payload }
    }

    case HOME_REMEMBER_ME_CHANGED: {
      const rememberMe = action.payload
      return { ...state, rememberMe }
    }

    case HOME_PASSWORD_RECOVERY_NEEDED:
      return { ...state, recovery: action.payload }

    case HOME_PASSWORD_RECOVERY_SENT:
      return { ...state, recovery: action.payload }

    default:
      return state
  }
}
