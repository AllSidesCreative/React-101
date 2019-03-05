import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { history } from './store.js'
import App from './routes';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'react-router-redux';
//import * as UserActions from './actions/UserActions.js'

//store.dispatch(UserActions.getData())

ReactDOM.render(
<Provider store={store}>
  <ConnectedRouter history={history}>
  <App/>
  </ConnectedRouter>
</Provider>, document.getElementById('root'))
registerServiceWorker()
