import React, { Component } from 'react';
import config from "../config";
import "./poll_result.css"
class PollResult extends Component {
    state = {
        poll: null,
        results: []
    }
    componentDidMount() {
        const uuid = this.props.match.params.id
        Promise.all([
            fetch(`${config.API_ENDPOINT}/votes/${uuid}`),
            fetch(`${config.API_ENDPOINT}/restaurants/${uuid}`),
            fetch(`${config.API_ENDPOINT}/poll/${uuid}`)
        ])
            .then(async ([votes, restaurants]) => {
                const votesJson = await votes.json();
                const restaurantsJson = await restaurants.json();
                return [votesJson, restaurantsJson];
            })
            .then(data => {
                const votes = data[0];
                const restaurants = data[1];
                // establish a map so we can count unique instances of restaurants
                let resultMap = {};
                votes.forEach(vote => {
                    //  check if the map does NOT have the restaurant key
                    if (!resultMap.hasOwnProperty(vote.restaurant_id)) {
                        // going to find the restaurant details in our restaurants collection
                        let restaurant = restaurants.find(restaurant => restaurant.id === vote.restaurant_id);
                        // Since it doesn't have the restaurant key, we add a property to our map to record the restaurant
                        resultMap[vote.restaurant_id] = {
                            //  use the spread operator to just grab all of the properties of the restaurant
                            ...restaurant,
                            //  add a votes property set to 1 (since we're just inserting the first one now)
                            votes: 1
                        };
                        // Otherwise,  HAVE the key already existing. We don't need to lookup anything. We just increase the vote counter.
                    } else {
                        resultMap[vote.restaurant_id].votes += 1;
                    }
                });
                // Next step is to sort the results by the vote count.
                // establish our new results array (this will be the final data structure)
                let results = [];
                // all of the object's keys (unique restaurants)
                for (const key in resultMap) {
                    // And for each one let's add it to our results array.
                    results.push(resultMap[key])
                }
                // Sort the results
                results.sort((a, b) => b.votes - a.votes);
                //  final results array with only unique restaurants, only restaurants that were voted on, and the highest vote counts at the top
                console.log(results);
                this.setState({
                    results: results
                })
                // y use a setState here to set this.state.results to results
            })
            .catch(function (error) {
                // if there's an error, log it
                console.log(error);
            });
    }
    render() {
        return (
            <div className="page_wrapper">
                <header role="banner">
                    <h1>Whats For Lunch</h1>
                </header>
                <section>
                    <div className="curStand">
                        <h3>Current Standings</h3>
                        {this.state.results.map((results, index) => {
                            return (
                                <div className="curStand" key={index}>
                                    {results.name} {results.votes} Votes
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        )
    }
}
export default PollResult