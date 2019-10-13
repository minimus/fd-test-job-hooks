/* @flow */

import React from 'react'
import { Translate, withLocalize } from 'react-localize-redux'
import { withRouter } from 'react-router'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet-universal'
import type { TCurrentPosition, TPosition } from '../../../types'

type TViewport = {
	center: number[],
}

type TProps = {
	position: TPosition,
	currentPosition: TCurrentPosition,
	zoom: number,
	viewportChanged: TViewport => any,
	history: {
		push: string => any,
	},
}

const BackgroundMap = ({ position, currentPosition, zoom, viewportChanged, history }: TProps): Node => {
	const handleViewportChanged = vp => {
		const {
			center: [latitude, longitude],
		} = vp
		if (
			(currentPosition.latitude && currentPosition.latitude !== latitude) ||
			(currentPosition.longitude && currentPosition.longitude !== longitude)
		) {
			history.push(`/${latitude}/${longitude}`)
		}
		viewportChanged(vp)
	}

	const { latitude, longitude } = position
	const { latitude: markLatitude, longitude: markLongitude } = currentPosition

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
				{markLatitude !== null && markLongitude !== null && (
					<Marker position={[markLatitude, markLongitude]}>
						<Popup>
							<Translate id="maps.markerPosition" />
						</Popup>
					</Marker>
				)}
			</LeafletMap>
		</div>
	)
}

export default withLocalize(withRouter(BackgroundMap))
