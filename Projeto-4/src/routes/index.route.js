const express = require("express");

const MovieController = require("../controller/Movie.Controller");

const routes = express.Router();


routes.get('/movies', MovieController.list)
routes.get('/movies/:id', MovieController.show)
routes.post('/movies', MovieController.create)
routes.put('/movies/:id', MovieController.update)
routes.get('/movies/:id', MovieController.delete)

module.exports = routes;