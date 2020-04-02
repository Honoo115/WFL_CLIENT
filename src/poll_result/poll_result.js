import React, { Component } from 'react';


class PollResult extends Component {
    static defaultProps = { restaurants: [], winningRestaurant: {name: ''} }

    render() {
        return (
            <div>
                <header role="banner">
                    <h1>Whats For Lunch</h1>
                </header>

                <section>
                    <div>
                        A Location Has Been Decided
                        
                    </div>
                    <div>   {this.props.winningRestaurant.name}</div>
                </section>

            </div>
        )
    }
}
export default PollResult