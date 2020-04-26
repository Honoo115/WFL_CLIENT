import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import PollStart from './poll_start/poll_start'
import PollOptions from './poll_options/poll_options'
// import PollSubmit from './poll_submit/poll_submit'
import PollResult from './poll_result/poll_result'
import config from "./config";







class App extends Component {
  state = { restaurants: [], polls: [], votes: [] }








  handleSubmit = (id) => {
    // e.preventDefault();
    let selectedRestaurant = this.state.restaurants.filter(restaurant => {
      return (
        restaurant.id === id
      )
    })[0]

    selectedRestaurant.votes ? selectedRestaurant.votes += 1 : selectedRestaurant.votes = 1
    console.log(this.state.restaurants)
  }

  handleTerminate = (e) => {
    e.preventDefault();
    let tempRestaurant = {}
    let max = 0;
    for (let i = 0; i < this.state.restaurants.length; i++) {
      console.log(max)
      if (this.state.restaurants[i].votes > max) {
        max = this.state.restaurants[i].votes;
        tempRestaurant = this.state.restaurants[i]
      }
    }




    this.setState({
      winningRestaurant: tempRestaurant
    })
  }



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
                  handleTerminate={this.handleTerminate}
                  handleSubmit={this.handleSubmit}
                  {...routeProps}
                  />
              )
            }
          }
        />





          {/* <Route exact path={""}>
            <PollSubmit />
          </Route> */}


          <Route exact path={"/results/:id"}>
            <PollResult
              winningRestaurant={this.state.winningRestaurant}
            />
          </Route>





        </Router>




      </div>


    )
  }

}
export default App;
