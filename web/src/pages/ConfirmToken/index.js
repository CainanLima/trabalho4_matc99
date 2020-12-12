import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Container } from "./styles";
// import Logo from "../../assets/airbnb-logo.svg";
import api from "../../services/api";
import { login } from "../../services/auth";



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
      try {
        const response = await api.post("/login", { token });
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

  componentDidMount(){
    if(!this.props.location?.state?.showRoute)
    this.props.history.push("/")
    // console.log(this.props)
  }

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