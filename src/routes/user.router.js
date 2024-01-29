const { getAll, create, getOne, destroy, update } = require('../controllers/user.controllers');
const express = require('express');

const userRouter = express.Router();

userRouter.route("/") //ruta estatica  / users
		.get(getAll)
		.post(create)

userRouter.route("/:id") //ruta dinamica  / users	
		.get(getOne)
		.delete(destroy)
		.put(update)



module.exports = userRouter;