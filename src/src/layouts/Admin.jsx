import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "../routes";
import Header from "../components/Header/Header";

import "./Admin.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      events: {},
      eventsLength: 0,
      usersLength: 0,
      pendent: 0,
    };
    this.mainPanel = React.createRef();
  }
  
  handleActiveClick = color => {
    this.setState({ activeColor: color });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <div className="main-panel" ref={this.mainPanel} style={{backgroundColor: "#cbcbd226"}}>
          <Header {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            
          </Switch>
          
        </div>
      </div>
    );
  }
}

export default Dashboard;
