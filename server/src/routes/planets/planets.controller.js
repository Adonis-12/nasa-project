const {planets} = require('../../models/planets.model')
let count = 0;

function getAllPlanets(req,res){
    res.status(200).json(planets)
    count++
    console.log(count)
}

module.exports ={
    getAllPlanets
}