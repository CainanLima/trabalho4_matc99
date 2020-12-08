import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Container } from "./styles";

import api from "../../services/api";

// import Logo from "../../assets/airbnb-logo.svg";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    role: "",
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password, role } = this.state;
    if (!username || !email || !password || !role) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else {
      try {
        await api.post("/users", { username, email, password, role });
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src="/" alt="Airbnb logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <select value={this.state.value}
            onChange={e => this.setState({ role: e.target.value})}>
              <option value="">Tipo de Usuário</option>
              <option value="admin">Administrador</option>
              <option value="common">Comum</option>
              <option value="special">Especial</option>
          </select>
        <button type="submit">Cadastrar</button>
        <hr />
        <Link to="/">Fazer login</Link>
        </Form>
      </Container >
    );
  }
}

export default withRouter(SignUp);