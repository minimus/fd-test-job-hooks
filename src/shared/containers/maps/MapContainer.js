import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { withRouter } from 'react-router'
import BackgroundMap from '../../components/maps/BackgroundMap'
import {
  MAP_VIEWPORT_CHANGED, MAP_USER_POSITION_CHANGE_STARTED,
  MAP_USER_POSITION_CHANGE_FINISHED, MAP_USER_POSITION_CHANGE_ERROR,
} from '../../redux/actions'
import { getUserPosition } from '../../redux/modules/helpers'

const MapContainer = () => {
  const mapRef = useRef()
  const mapProps = useSelector(state => state.maps, shallowEqual)
  const dispatch = useDispatch()
  const viewportChanged = useCallback(
    (viewport) => {
      const { center: [latitude, longitude], zoom } = viewport
      dispatch({ type: MAP_VIEWPORT_CHANGED, payload: { position: { latitude, longitude }, zoom } })
    },
    [dispatch],
  )


  const { position, currentPosition, zoom } = mapProps

  useEffect(() => {
    const changeUserPosition = () => {
      if (process.env.BROWSER) {
        dispatch({
          type: MAP_USER_POSITION_CHANGE_STARTED,
          payload: true,
        })

        setTimeout(() => {
          getUserPosition({
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
          })
            .then((data) => {
              const { latitude, longitude } = data.coords
              dispatch({
                type: MAP_USER_POSITION_CHANGE_FINISHED,
                payload: {
                  isSet: true,
                  latitude,
                  longitude,
                },
              })
            })
            .catch((err) => {
              dispatch({
                type: MAP_USER_POSITION_CHANGE_ERROR,
                payload: err,
              })
            })
        }, 1500)
      }
    }
    changeUserPosition()
  }, [mapRef, dispatch])

  return (
    <BackgroundMap
      position={position}
      currentPosition={currentPosition}
      zoom={zoom}
      viewportChanged={viewportChanged}
    />
  )
}

export default withRouter(MapContainer)
