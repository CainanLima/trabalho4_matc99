'use strict'
const crypto = require("crypto");
const Mail = use("Mail");
const User = use("App/Models/User")
const Env = use("Env");

class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.all()

    const hash = await auth.attempt(email, password)
    if (!hash) return { message: "Erro de autenticação" }
    const token = crypto.randomBytes(10).toString("hex");
    const user = await User.findBy('email', email)
    user.token = token
    user.token_created = new Date()

    await user.save()
    await Mail.send(
      "emails.twofactor",
      { username: user.username, codigo: token },
      (message) => {
        message
          .to(email)
          .from(Env.get("MAILGUN_HOSTNAME"))
          .subject("Código de acesso");
      }
    );

    return { message: "Token enviado para seu email", token1: hash }
  }

  async login({ auth, request }) {
    const inputToken = request.only(["token"])
    // if (auth.user.token == inputToken.token) {
      const user = await User.findByOrFail('token', inputToken.token)
      console.log(user)
      const lotsOfTokens = await auth.generate(user)
      return lotsOfTokens
    // } else return { message: "Token Invalido" }
  }
}

module.exports = SessionController
