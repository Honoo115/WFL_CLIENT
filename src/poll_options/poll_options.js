import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import config from "../config";






class PollOptions extends Component {

    state = {
        restaurants: [],
        currentRestaurant: 0,
        poll: null
    }
    componentDidMount() {
        const uuid = this.props.match.params.id

        fetch(`${config.API_ENDPOINT}/restaurants/${uuid}`)
            .then(res => res.json())
            .then(restaurants => {
                this.setState({
                    restaurants: restaurants,
                    poll: uuid
                });
            });

    }
    handleNext() {
        let nextIndex = this.state.currentRestaurant + 1
        if (nextIndex >= this.state.restaurants.length) {
            nextIndex = 0
        }
        this.setState({
            currentRestaurant: nextIndex
        })
    }

    handleSubmit = (id) => {
        // e.preventDefault();
        let selectedRestaurant = this.state.restaurants.filter(restaurant => {
            return (
                restaurant.id === id
            )
        })[0]
        const vote = {
            restaurant_id: id,
            poll_id: this.state.poll
        }
        const url = `${config.API_ENDPOINT}/votes/${this.state.poll}`
        const options = {
            method: "POST",
            body: JSON.stringify(vote),
            headers: {
                "Content-Type":"application/json"
            }
        }
        fetch(url, options)
        .then(res => {
            if (!res.ok) {
                throw new Error("Error, please try again")
            }
            return res.json();
        })
        .then(resJson => {
            this.props.history.push(`/results/${this.state.poll}`)
        })
        .catch(err => {
            this.setState({
                error: err.message
            })
        })
        selectedRestaurant.votes ? selectedRestaurant.votes += 1 : selectedRestaurant.votes = 1
    }


    render() {

        let restaurant = this.state.restaurants[this.state.currentRestaurant]
        return (
            <div>
                <header role="banner">
                    <h1>Whats For Lunch?</h1>
                </header>
                <section>
                    {restaurant ?
                        <div>
                            {restaurant.name}
                            <div>
                                {restaurant.address}
                                <div>
                                    {restaurant.area}
                                    <div>
                                        {typeof restaurant !== "undefined"
                                            ? <iframe
                                                src={`https://www.google.com/maps?q=${restaurant.lat},${restaurant.lng}&z=15&output=embed`}
                                                width="360"
                                                height="270"
                                                frameborder="0"
                                                style={{ border: 0 }}
                                            />
                                            : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ''}
                    <div>
                        <button onClick={this.handleNext.bind(this)}>Next</button>
                        <button onClick={() => { this.handleSubmit(restaurant.id) }}>VOTE</button>
                        <button onClick={this.props.handleTerminate}>End Poll Temp</button>
                    </div>
                </section>
            </div>
        )
    }
}

export default PollOptions