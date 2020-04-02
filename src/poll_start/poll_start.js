import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom';
// import { Link } from "react-router-dom";
class PollStart extends Component {
    state = {
        city: { value: '' },
        zip: { value: '' },
        redirect: false
    };
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.city.value.length > 0 || this.state.zip.value.length > 0) {
            this.setState({ redirect: true })
            let pollBody = {
                uuid: uuidv4(),
                timer: new Date(),
                city: this.state.city.value,
                zip: this.state.zip.value
            }
            console.log(pollBody)
        } else {
            alert("City or zip is required")
        }
    }
    updateCity(city) {
        this.setState({ city: { value: city } })
    };



    updateZip(zip) {
        this.setState({ zip: { value: zip } })
    };


    render() {
        if (this.state.redirect) return <Redirect to={`/poll/${uuidv4}`} />;
        else return (
            <div>
                <header role="banner">
                    <h1>Whats For Lunch?</h1>
                </header>

                <section>
                    <div>City Name</div>
                    <form
                        onSubmit={e => this.handleSubmit(e)}>
                        <input type="text"
                            id="city-input"
                            onChange={e => this.updateCity(e.target.value)}
                        />

                        <div>Zip Code</div>

                        <input type="text"
                            id="zip-input"
                            onChange={e => this.updateZip(e.target.value)}
                        />
                        <div>

                            <button type="submit">
                                Start Poll
                                </button>


                        </div>

                    </form>

                </section>
            </div>
        )
    }
}
export default PollStart;
