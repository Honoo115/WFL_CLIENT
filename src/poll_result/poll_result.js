import React, { Component } from 'react';
import config from "../config";
class PollResult extends Component {
    state = {
        restaurants: [],
        poll: null
    }
    componentDidMount() {
        const uuid = this.props.match.params.id
        fetch(`${config.API_ENDPOINT}/votes/${uuid}`)
            .then(res => res.json())
            .then(restaurants => {
                // remove extraneous info about the restaurant (could be done server side too)
                // Count how many of each restaurant exist
                // return object with {id, name, votes}
                const voteCounts = Object.values(
                    restaurants
                        .map((restaurant) => ({ id: restaurant.id, name: restaurant.name }))
                        .reduce((acc, curr) => {
                            if (acc[curr.id]) {
                                acc[curr.id].votes++;
                            } else {
                                acc[curr.id] = { ...curr, votes: 1 };
                            }
                            return acc;
                        }, {})
                );
                this.setState({
                    restaurants: voteCounts,
                    poll: uuid
                });
            });
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