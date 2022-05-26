import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../src/stores/reduxStore';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import WalletProvider from './components/WalletProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WalletProvider>
        <App />
      </WalletProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
