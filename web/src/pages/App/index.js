import React, { Component, useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../../services/api";
import { logout } from "../../services/auth"

import {  Container } from "./styles";

function App ({history}) { 
    const [state, setState] = useState("Carregando...")

    async function loadRole () {
        try {
            const response = await api.get("/main");
            setState(response.data.message)
        } catch (err) {
            console.log(err);
        }
    }

    function sair (){
        logout()
        history.push("/")
    }

    useEffect (() => {
        loadRole()
    }, [])

        return (
            <Container>
                <div>
                <p>{state}</p>
                <button type="submit" onClick={sair}>Log Out</button>
                </div>
            </Container>
        );
}

export default withRouter(App);