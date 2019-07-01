import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import Map from '../maps/MapContainer'
import Recovery from '../../components/home/HomeRecovery'
import Login from '../../components/home/HomeLogin'

const HomeContainer = () => {
  const recovery = useSelector(state => state.home.recovery)

  const dialogContent = () => {
    if (recovery) return <Recovery />
    return <Login />
  }

  return (
    <div id="home-container">
      <Map />
      <section id="home-component">
        {dialogContent()}
      </section>
    </div>
  )
}

export default withRouter(HomeContainer)
