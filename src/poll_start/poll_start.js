import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import config from "../config";
import "./poll_start.css"
// import { Link } from "react-router-dom";
class PollStart extends Component {
    state = {
        city: { value: '' },
        zip: { value: '' },
    };
    handleSubmit = (e, uuid) => {
        e.preventDefault();
        (this.state.city.value)
        (this.state.zip.value)
        if (this.state.city.value.length > 0 || this.state.zip.value.length > 0) {
            let pollBody = {
                uuid: uuid,
                city: this.state.city.value,
                postal_code: this.state.zip.value
            }
            const url = `${config.API_ENDPOINT}/poll`
            const options = {
                method: "POST",
                body: JSON.stringify(pollBody),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            fetch(url, options)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Error, please try again.")
                    }
                    return res.json();
                })
                .then(resJson => {
                    this.props.history.push(`/poll/${uuid}`)
                })
                .catch(err => {
                    this.setState({
                        error: err.message
                    })
                })
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
        const uuid = uuidv4();
        return (
            <div className="page_wrapper">
                <header role="banner">
                    <h1>Whats For Lunch?</h1>
                </header>
                <section>
                    <p>Welcome! Start by inputting  either
                    the name of a City or a Postal Code below and press 'Start Poll' to begin. 
                    Once a poll is started send the link to your fellow voters! 
                    
                    </p>
                    <p className="splash_warning">ONLY RESTAURANTS WITH ONLINE RESERVATIONS WILL APPEAR</p>
                </section>
                <section>
                    <div className="cityName">City Name</div>
                    <form
                        onSubmit={e => this.handleSubmit(e, uuid)}>
                        <input type="text"
                            id="city-input"
                            onChange={e => this.updateCity(e.target.value)}
                        />

                        <div className="zipCode">Zip Code</div>

                        <input type="text"
                            id="zip-input"
                            onChange={e => this.updateZip(e.target.value)}
                        />
                        <div>

                            <button className="myButton" type="submit">
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
