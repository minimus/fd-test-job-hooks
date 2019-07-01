import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { LocalizeProvider } from 'react-localize-redux'
import ReactDOMServer from 'react-dom/server'
import configStore from './configStore'
import Application from '../shared/Application'
import { getUserLocale } from '../shared/redux/modules/helpers'
import translation from '../shared/localization'

process.env.BROWSER = true

const locale = getUserLocale()

const localesInit = {
  ...translation,
  options: {
    defaultLanguage: locale,
    renderToStaticMarkup: ReactDOMServer.renderToStaticMarkup,
  },
}

// eslint-disable-next-line no-underscore-dangle
const state = window.__PRELOADED_STATE__

const store = configStore(state)

hydrate(
  <Provider store={store}>
    <LocalizeProvider initialize={localesInit}>
      <Router>
        <Application />
      </Router>
    </LocalizeProvider>
  </Provider>,
  document.querySelector('#app'),
)
