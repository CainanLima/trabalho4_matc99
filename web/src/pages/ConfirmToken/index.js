import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Container } from "./styles";
// import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { login, logout } from "../../services/auth";



class ConfirmToken extends Component {
  state = {
    token: ""
  };

  handleConfirmToken = async e => {
    e.preventDefault();
    const { token } = this.state;
    if (!token) {
      this.setState({ error: "Preencha o código de acesso para continuar!" });
    } else {
      console.log(token)
      try {
        const response = await api.post("/login", { token });
        logout()
        login(response.data.token)
        this.props.history.push("/app")
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique seu código de acesso."
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleConfirmToken}>
          <img src="/" alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Código de Acesso"
            onChange={e => this.setState({ token: e.target.value })}
          />
          <button type="submit">Confirmar</button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(ConfirmToken);