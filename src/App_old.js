import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import firebase from './firebase/firebase';
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
