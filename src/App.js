import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import PollStart from './poll_start/poll_start'
import PollOptions from './poll_options/poll_options'
// import PollSubmit from './poll_submit/poll_submit'
import PollResult from './poll_result/poll_result'







class App extends Component {
  state = {
    restaurants: [{
      "id": 39814,
      "name": "AQUA by El Gaucho",
      "address": "2801 Alaskan Way",
      "city": "Seattle",
      "state": "WA",
      "area": "Seattle / Eastern Washington",
      "postal_code": "98121",
      "country": "US",
      "phone": "2069569171x",
      "lat": 47.614422,
      "lng": -122.354045,
      "price": 4,
      "reserve_url": "http://www.opentable.com/single.aspx?rid=39814",
      "mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=39814",
      "image_url": "https://www.opentable.com/img/restimages/39814.jpg"
    },
    {
      "id": 3274,
      "name": "Lola Seattle",
      "address": "2000 Fourth Avenue",
      "city": "Seattle",
      "state": "WA",
      "area": "Seattle / Eastern Washington",
      "postal_code": "98121",
      "country": "US",
      "phone": "2064411430",
      "lat": 47.613,
      "lng": -122.3399,
      "price": 3,
      "reserve_url": "http://www.opentable.com/single.aspx?rid=3274",
      "mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=3274",
      "image_url": "https://www.opentable.com/img/restimages/3274.jpg"
    },
    {
      "id": 1345,
      "name": "Assaggio",
      "address": "2010 4th Ave.",
      "city": "Seattle",
      "state": "WA",
      "area": "Seattle / Eastern Washington",
      "postal_code": "98121",
      "country": "US",
      "phone": "2064411399",
      "lat": 47.613256,
      "lng": -122.34003,
      "price": 3,
      "reserve_url": "http://www.opentable.com/single.aspx?rid=1345",
      "mobile_reserve_url": "http://mobile.opentable.com/opentable/?restId=1345",
      "image_url": "https://www.opentable.com/img/restimages/1345.jpg"
    }],
  }
  handleSubmit = (id) => {
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
      redirect: true,
      winningRestaurant: tempRestaurant
    })
  }



  render() {
    return (
      <div className="App" >
        <Router>
          <Route exact path={"/poll"}>

            <PollStart />

          </Route>

          <Route exact path={"/poll/:id"}>
            <PollOptions
              redirect={this.state.redirect}
              handleTerminate={this.handleTerminate}
              handleSubmit={this.handleSubmit}
              restaurants={this.state.restaurants} />
          </Route>



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
