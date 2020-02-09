import React from 'react'
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header/Header';
import Routes from './routes';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  )
}
