const {parse} = require('csv-parse')
const fs = require('fs')
const path = require('path')

let result = [];

function planetIsHabitable(planet){
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 
    && planet['koi_prad'] < 1.6
}

function loadAllPlanets (){
    return new Promise((resolve,reject) => {
        
        fs.createReadStream(path.join(__dirname,'..','data','kepler_archieve.csv'))
            .pipe(parse({
                columns:true,
                comment:'#'
            }))
            .on('data',(data) => {
                if(planetIsHabitable(data) ){
                    result.push(data)
                }
            })
            .on('end',() => {
                console.log(`${result.length} habitable planets are found `)
                resolve()
            })
            .on('error',(error) => {
                reject(err)
                console.log(err)
            })
    })

}    

function getAllPlanets(){
    return result
}

module.exports = {
    loadAllPlanets,
    getAllPlanets,
}