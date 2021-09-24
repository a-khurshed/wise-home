import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider, createTheme } from '@material-ui/core';

import App from './App';
import store from './store';
import { theme } from './constants';
import { SnackbarProvider } from './components/common';

axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <ReduxProvider store={store}>
    <ThemeProvider theme={createTheme(theme)}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
