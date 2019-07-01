import { getDefaultPosition } from '../helpers'
import {
  MAP_USER_POSITION_CHANGE_STARTED, MAP_USER_POSITION_CHANGE_FINISHED,
  MAP_USER_POSITION_CHANGE_ERROR, MAP_VIEWPORT_CHANGED,
} from '../../actions'

const initialState = {
  position: getDefaultPosition('en'),
  currentPosition: {
    isSet: false,
    latitude: null,
    longitude: null,
  },
  storedPosition: {
    stored: false,
    latitude: null,
    longitude: null,
  },
  zoom: 9,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MAP_USER_POSITION_CHANGE_STARTED:
      return state

    case MAP_USER_POSITION_CHANGE_FINISHED: {
      const { storedPosition } = state
      return {
        ...state,
        position: (storedPosition.stored) ? {
          latitude: storedPosition.latitude,
          longitude: storedPosition.longitude,
        } : action.payload,
        currentPosition: { ...action.payload },
        zoom: 10,
      }
    }

    case MAP_USER_POSITION_CHANGE_ERROR: {
      const { storedPosition } = state
      const { locale } = state
      const position = getDefaultPosition(locale)
      return {
        ...state,
        position: (storedPosition.stored) ? {
          latitude: storedPosition.latitude,
          longitude: storedPosition.longitude,
        } : position,
        currentPosition: { ...position, isSet: true },
        zoom: 10,
      }
    }

    case MAP_VIEWPORT_CHANGED:
      return { ...state, ...action.payload }

    default: return state
  }
}
