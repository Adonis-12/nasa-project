const {planets} = require('../../models/planets')
let count = 0;

function getAllPlanets(req,res){
    res.status(200).json(planets)
    count++
    console.log(count)
}

module.exports ={
    getAllPlanets
}