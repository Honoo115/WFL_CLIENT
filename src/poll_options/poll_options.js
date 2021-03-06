import React, { Component } from 'react';
import config from "../config";
import "./poll_options.css";





class PollOptions extends Component {

    state = {
        restaurants: [],
        currentRestaurant: 0,
        poll: null
    }
    handleBack = (e) => {
        this.props.history.push('/')
    }
    componentDidMount() {
        const uuid = this.props.match.params.id
        fetch(`${config.API_ENDPOINT}/poll/${uuid}`)
            .then(res => res.json())
            .then(poll => {
                let expired = new Date(poll.end_time);
                let now = new Date();
                if (expired < now) {
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
        Math.floor(Math.random() * this.state.restaurants.length)
        this.setState({
            currentRestaurant: Math.floor(Math.random() * this.state.restaurants.length)
        });
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
        if (this.state.restaurants.length <= 0) {
            return (<div>
                <p className="noRest">No Restaurants within the online reserveation requirments are associated with that Zip Code / City.
                Please Try Again.
                </p>
                <button className="myButton" onClick={() => { this.handleBack() }}>Start New Poll?</button>
            </div>

            )
        }
        else {
            let restaurant = this.state.restaurants[this.state.currentRestaurant]
            return (
                <div className="page_wrapper">
                    <header role="banner">
                        <h1>What's For Lunch?</h1>
                    </header>
                    <section>
                        {restaurant ?
                            <div className="restName">
                                <p className="extra"> ↑ Share url above to fellow voters ↑</p>
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
                                                    width="250"
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
}


export default PollOptions