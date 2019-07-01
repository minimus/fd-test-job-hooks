import React from 'react'
import propTypes from 'prop-types'
import { Translate, withLocalize } from 'react-localize-redux'
import { withRouter } from 'react-router'
import {
  Map as LeafletMap, TileLayer, Marker, Popup,
} from 'react-leaflet-universal'

const BackgroundMap = ({
  position, currentPosition, zoom, viewportChanged, history,
}) => {
  const handleViewportChanged = (vp) => {
    const { center: [latitude, longitude] } = vp
    if ((currentPosition.latitude && currentPosition.latitude !== latitude)
      || (currentPosition.longitude && currentPosition.longitude !== longitude)) {
      history.push(`/${latitude}/${longitude}`)
    }
    viewportChanged(vp)
  }

  const { latitude, longitude } = position
  const {
    latitude: markLatitude,
    longitude: markLongitude,
  } = currentPosition

  return (
    <div id="maps">
      <LeafletMap
        center={[latitude, longitude]}
        zoom={zoom}
        maxZoom={10}
        attributionControl
        doubleClickZoom
        scrollWheelZoom
        zoomControl={false}
        dragging
        animate
        easeLinearity={0.35}
        style={{ width: '100%', height: '100%' }}
        onViewportChanged={handleViewportChanged}
      >
        <TileLayer
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {(markLatitude === null || markLongitude === null) ? false : (
          <Marker position={[markLatitude, markLongitude]}>
            <Popup><Translate id="maps.markerPosition" /></Popup>
          </Marker>
        )}
      </LeafletMap>
    </div>
  )
}

BackgroundMap.propTypes = {
  position: propTypes.objectOf.isRequired,
  currentPosition: propTypes.objectOf.isRequired,
  zoom: propTypes.objectOf.isRequired,
  viewportChanged: propTypes.func.isRequired,
  history: propTypes.objectOf.isRequired,
}

export default withLocalize(withRouter(BackgroundMap))
