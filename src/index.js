import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Firebase, { FirebaseContext } from './config/index';
import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
	<FirebaseContext.Provider value = {new Firebase()}>
	<Provider store={store}>
		<App />
	</Provider>
	</FirebaseContext.Provider>,
	document.getElementById("root")
);
serviceWorker.register();