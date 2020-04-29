import React, { Component } from 'react';
import config from "../config";
class PollResult extends Component {
    state = {
        restaurants: [],
        poll: null
    }
    componentDidMount() {
        const uuid = this.props.match.params.id
        Promise.all([
            fetch(`${config.API_ENDPOINT}/votes/${uuid}`),
            fetch(`${config.API_ENDPOINT}/restaurants/${uuid}`)
        ])
            .then(responses => {
                return responses.map(res => res.json())
            })
            .then(data => {
                let votes = data[0];
                let restaurants = data[1]
                let resultMap = {};
                console.log(votes)
                votes.forEach(vote => {
                    // We check if the map does NOT have the restaurant key
                    if (!resultMap.hasOwnProperty(vote.restaurant_id)) {
                        // We're going to find the restaurant details in our restaurants collection
                        let restaurant = restaurants.find(restaurant => restaurant.id === vote.restaurant_id);
                        // Since it doesn't have the restaurant key, we add a property to our map to record the restaurant
                        resultMap[vote.restaurant_id] = {
                            // We'll use the spread operator to just grab all of the properties of the restaurant
                            ...restaurant,
                            // And we'll add a votes property set to 1 (since we're just inserting the first one now)
                            votes: 1
                        };
                        // Otherwise, we HAVE the key already existing. We don't need to lookup anything. We just increase the vote counter.
                    } else {
                        resultMap[vote.restaurant_id].votes += 1;
                    };
                });
                // Now we have our unique votes all stored. Here is a console to see what it looks like
                console.log(resultMap);
                // Next step is to sort the results by the vote count.
                // Let's establish our new results array (this will be the final data structure)
                let results = [];
                // Let's get all of the object's keys (unique restaurants)
                for (const key in resultMap) {
                    // And for each one let's add it to our results array.
                    results.push(resultMap[key])
                };
                // Notice now we don't have the keys. Its just two objects in an array. All we have to do now is sort it.
                console.log(results);
                // Sort the results
                results.sort((a, b) => b.votes - a.votes);
                // Here is your final results array with only unique restaurants, only restaurants that were voted on, and the highest vote counts at the top
                console.log(results);

            })
    }
    render() {
        return (
            <div>
                <header role="banner">
                    <h1>Whats For Lunch</h1>
                </header>
                <section>
                    <div>
                        Current Standings
                        {this.state.restaurants.map(restaurant => {
                        return (
                            <div>
                                {restaurant.name} {restaurant.votes} Votes
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