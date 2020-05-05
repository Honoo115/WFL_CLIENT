import React, { Component } from 'react';
import config from "../config";
import "./poll_options.css"





class PollOptions extends Component {

    state = {
        restaurants: [],
        currentRestaurant: 0,
        poll: null
    }
    componentDidMount() {
        const uuid = this.props.match.params.id
        fetch(`${config.API_ENDPOINT}/poll/${uuid}`)
            .then(res => res.json())
            .then(poll => {
                let expired = new Date(poll.end_time);
                let now = new Date();
                if (expired < now) {
                    console.log("Poll is expired");
                    alert('The Poll Has Expired');
                    this.props.history.push(`/results/${this.state.poll}`)
                }
            });

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
                "Content-Type": "application/json"
            }
        }
        fetch(url, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Error, please try again")
                }
                else {
                    return res.json();
                }
            })
            .then(resJson => {
                if (resJson.hasOwnProperty("msg") && resJson.msg === "You have already voted, click OK to redirect to current standings") {
                    alert(resJson.msg)
                    this.props.history.push(`/results/${this.state.poll}`)
                } else {
                    this.props.history.push(`/results/${this.state.poll}`)
                }
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
            <div className="page_wrapper">
                <header role="banner">
                    <h1>Whats For Lunch?</h1>
                </header>
                <section>
                    {restaurant ?
                        <div className="restName">
                            {restaurant.name}
                            <div>
                                {restaurant.address}
                                <div>
                                    {restaurant.area}
                                    <div>
                                        {typeof restaurant !== "undefined"
                                            ? <iframe
                                                title="restMap"
                                                src={`https://www.google.com/maps?q=${restaurant.lat},${restaurant.lng}&z=15&output=embed`}
                                                width="320"
                                                height="270"
                                                frameBorder="0"
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
                        <button className="myButton" onClick={this.handleNext.bind(this)}>Next</button>
                        <button className="myButton" onClick={() => { this.handleSubmit(restaurant.id) }}>VOTE</button>
                    </div>
                </section>
            </div>
        )
    }
}

export default PollOptions