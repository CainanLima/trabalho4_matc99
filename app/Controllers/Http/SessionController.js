'use strict'
const crypto = require("crypto");
const Mail = use("Mail");
const User = use("App/Models/User")
const Env = use("Env");

class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.all()

    const hash = await auth.attempt(email, password)
    const token = crypto.randomBytes(10).toString("hex");
    const user = await User.findBy('email', email)
    user.token = token
    user.token_created = new Date()

    await user.save()

    await Mail.send(
      "emails.twofactor",
      {username: user.username, codigo: token },
      (message) => {
        message
          .to(email)
          .from(Env.get("MAILGUN_HOSTNAME"))
          .subject("Código de acesso");
      }
    );

    return { message: "Token enviado para seu email" }
    // return hash
  }

  async login({ auth, request }) {
    const inputToken = request.only(["token"])
    const user = await User.findBy('token', inputToken.token)
    const lotsOfTokens = await auth.generate(user)
    return lotsOfTokens
  }
}

module.exports = SessionController
