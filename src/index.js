import React from 'react';
import ReactDOM from 'react-dom';
//import queryClient, QueryClientProvider from react query for setup 
import {QueryClient,QueryClientProvider} from 'react-query';

//import also the dev tools
import {ReactQueryDevtools} from 'react-query/devtools';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//create queryClient - is a  data manager for all the queries we'll 
//be using to retrieve data from backend server
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    {/* add QueryClientProvider surrounding our app */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* add ReactQueryDevTools for debuging queries */}
      <ReactQueryDevtools/>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
