import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/provider';
import store from './store';
import theme from './theme';

ReactDOM.render(
  <ChakraProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
  </ChakraProvider>,
  document.getElementById('root')
);
