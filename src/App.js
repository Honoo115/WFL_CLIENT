import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import PollStart from './poll_start/poll_start';
import PollOptions from './poll_options/poll_options';
import PollResult from './poll_result/poll_result';







class App extends Component {
  state = { restaurants: [], polls: [], votes: [] }

  render() {
    return (
      <div className="App" >
        <Router>
          <Route
            exact path={"/"}
            component={PollStart}
          />
          <Route exact path={"/poll/:id"}
            render={(routeProps) => {
              return (
                <PollOptions
                  {...routeProps}
                />
              )
            }
            }
          />






          <Route exact path={"/results/:id"}
            render={(routeProps) => {
              return (
                <PollResult
                  {...routeProps} />
              )
            }}
          />









        </Router>




      </div>


    )
  }

}
export default App;
