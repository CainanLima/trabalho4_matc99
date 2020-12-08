"use strict"

const User = use("App/Models/User")

class UserController {
  async create({ request }) {
    const data = request.only(["username", "email", "password", "role"])

    const user = await User.create(data)

    return user
  }

  async index({ auth }) {
    const user = auth.user

    if (user.role == "admin")
      return { message: "Usuário administrativo" }
    else if (user.role == "common")
      return { message: "Usuário Comum" }
    else return { message: "Usuário Especial" }
  }
}

module.exports = UserController
