import React, { Component, useState} from "react";
import { Link, withRouter } from "react-router-dom";

// import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";

import {  Container } from "./styles";

class App extends Component { 
    state = {
        role: ""
    };

    loadRole = async e => {
        e.preventDefault();
        const { username } = this.state.viewport;
        try {
            const response = await api.get("/main");
            this.setState({ role: response })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Container>
                <p>{this.state.role}</p>
            </Container>
        );
    }
}

export default withRouter(App);