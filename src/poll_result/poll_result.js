import React, { Component } from 'react';
import config from "../config";
import "./poll_result.css";
class PollResult extends Component {
    state = {
        poll: null,
        results: []
    }
    handleBack = (e) => {
        this.props.history.push('/')
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
                let resultMap = {};
                votes.forEach(vote => {
                    
                    if (!resultMap.hasOwnProperty(vote.restaurant_id)) {

                        let restaurant = restaurants.find(restaurant => restaurant.id === vote.restaurant_id);

                        resultMap[vote.restaurant_id] = {

                            ...restaurant,

                            votes: 1
                        };

                    } else {
                        resultMap[vote.restaurant_id].votes += 1;
                    }
                });
             
                let results = [];

                for (const key in resultMap) {

                    results.push(resultMap[key])
                }
               
                results.sort((a, b) => b.votes - a.votes);
               
                this.setState({
                    results: results
                })
               
            })
            .catch(function (error) {
                
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
                <button className="myButton" onClick={() => { this.handleBack() }}>Start New Poll?</button>
            </div>
        )
    }
}
export default PollResult