import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Header from '../src/components/Header/Header';
import "bootstrap/dist/css/bootstrap.css";
import firebase from '../src/firebase/firebase';

import AdminLayout from "../src/layouts/Admin";
import routes from './routes.js';
import './global.css';
const hist = createBrowserHistory();



ReactDOM.render(
  
    <Router history={hist}>
      {
        
        <Header />
      }
      <Switch>
        {routes.map((prop, key) => {
          if (prop.redirect)
            return <Redirect exact={true} from={prop.path} to={prop.to} key={key} render={props => <AdminLayout {...props} /> }/>;
          return <Route path={prop.path} key={key} component={prop.component} render={props => <AdminLayout {...props} /> }/>;
        })}
      </Switch>
    
    </Router>,
    document.getElementById('root')
);
