const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll() //select * from users;
    
    // Operaciones...
    return res.json(users)
});

const create = catchError(async (req, res) => {
    //console.log(req.body);
    const { firstname, lastname, email, password, birthday } = req.body

    const newBody = { firstname, lastname, email, password, birthday }

    const user = await User.create(newBody)

    return res.send("User Create").status(201).json(user)
    
})
const getOne = catchError(async (req, res) => {
    
    const { id } = req.params

    const user = await User.findByPk(id)
    if (!user)res.sendStatus(404).json({message:"User not found"})
    return res.json(user)
    
})

const destroy = catchError(async (req, res) => {
    const { id } = req.params
    const user = await User.destroy({where:{ id }})
    if (!user) res.sendStatus(404)
    return res.send('User Deleted').status(204)
})

const update = catchError(async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, email, password, birthday } = req.body
    const newBody = { firstname, lastname, email, password, birthday }

    const user = await User.findByPk(id)
    if (!user) return res.sendStatus(404)
    
    const userUpadate = await User.update(
        newBody,
        { where: { id }, returning: true}
    )
    if(userUpadate[0] === 0) return res.sendStatus(404).json({message:"User not found"})
    
    return res.send("User Update").status(201).json(userUpadate[1][0])

})

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}