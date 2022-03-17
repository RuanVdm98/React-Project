import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import './App.css';

import GlobalStyles from './styles/global'
import Routes from './routes'

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyles />
  </>
)

export default App
