'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')
Route.post('/login', 'SessionController.login')
  // .middleware('auth')
Route.get('/main', 'UserController.index')
  .middleware('auth')
