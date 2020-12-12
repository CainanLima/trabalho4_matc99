import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Container } from "./styles";

import api from "../../services/api";

import Logo from "../../assets/logo.png";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    strength: "",
    role: "",
    error: ""
  };
  passwordStrength(password){
    var base = 0;
    var forca
    if((password.length >= 4) && (password.length <= 7)){
      base += 10;
    }else if(password.length>7){
      base += 25;
    }
    if(password.match(/[a-z]+/)){
      base += 10;
    }
    if(password.match(/[A-Z]+/)){
      base += 20;
    }
    if(password.match(/(\d+)/)){
      base += 20;
    }
    if(password.match(/(\W+)/)){
      base += 25;
    }

    if(base < 30){
      forca = "Fraca"
    }else if((base >= 30) && (base < 60)){
      forca = "Okay"
    }else if((base >= 60) && (base < 85)){
      forca = "Forte"
    }else{
      forca = "Excelente"
    }
    return forca
  }

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password, role, strength } = this.state;
    if (!username || !email || !password || !role) {
      this.setState({ error: "Preencha todos os dados para se cadastrar" });
    } else if(strength==="Fraca"){
        this.setState({error: "Sua senha é muito fraca, use diferentes cases, numeros e caracteres especiais"})
    }else if(password.length<6){
        this.setState({error: "Senha muito curta"})
    }else{
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
          <img src={Logo} alt="Logo Genérico" />
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
            onChange={e => {
              this.setState({ strength: this.passwordStrength(e.target.value)})
              this.setState({ password: e.target.value })
            }}
          />
          <p>Força da senha: { this.state.strength}</p>
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