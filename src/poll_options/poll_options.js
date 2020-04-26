import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import config from "../config";
import { Map, GoogleApiWrapper } from 'google-maps-react';





class PollOptions extends Component {

    state = {
        restaurants: [],
        currentRestaurant: 0,
    }
    componentDidMount() {
        const uuid = this.props.match.params.id

        fetch(`${config.API_ENDPOINT}/restaurants/${uuid}`)
            .then(res => res.json())
            .then(restaurants => {
                this.setState({
                    restaurants: restaurants
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



    render() {

        let restaurant = this.state.restaurants[this.state.currentRestaurant]
        // let map = (typeof restaurant !== "undefined")
        //     ? `${<iframe
        //         src="https://www.google.com/maps/${restaurant.lat},${restaurant.lng}&z=15&output=embed"
        //         width="360"
        //         height="270"
        //         frameborder="0"
        //         style="border:0"
        //     />}`
        //     : 'Value is undefined';
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
                        <button onClick={() => { this.props.handleSubmit(restaurant.id) }}>VOTE</button>
                        <button onClick={this.props.handleTerminate}>End Poll Temp</button>
                    </div>
                </section>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBLnsNugklSnZuKWbk0Ve75GfYBX1Qe1lc'
})(PollOptions)