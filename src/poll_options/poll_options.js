import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



class PollOptions extends Component {
    state = {
        currentRestaurant: 0,
    }

    static defaultProps = { restaurants: [] }

    handleNext() {
        let nextIndex = this.state.currentRestaurant + 1
        if (nextIndex >= this.props.restaurants.length) {
            nextIndex = 0
        }
        this.setState({
            currentRestaurant: nextIndex
        })
    }


    render() {
        const restaurant = this.props.restaurants[this.state.currentRestaurant]
        if (this.props.redirect) return <Redirect to={`/results/${uuidv4()}`} />;
        else return (
            <div>
                <header role="banner">
                    <h1>Whats For Lunch?</h1>
                </header>
                <section>
                    {restaurant ?
                        <div>
                            {restaurant.name}
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
export default PollOptions;