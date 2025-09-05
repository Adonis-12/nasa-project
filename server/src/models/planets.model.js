const {parse} = require('csv-parse')
const fs = require('fs')
const path = require('path')
const planets = require('./planets.mongo')



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
            .on('data',async (data) => {
                if(planetIsHabitable(data) ){
                    await planets.updateOne({
                        kepler_name : data.kepler_name
                    },{
                        kepler_name:data.kepler_name
                    },{
                        upsert:true
                    })
                }
            })
            .on('end',async () => {
                const count = await planets.countDocuments()
                console.log(`${count} habitable planets are found `)
                resolve()
            })
            .on('error',(error) => {
                reject(err)
                console.log(err)
            })
    })

}    

async function getAllPlanets(){
    return await planets.find({})
}

module.exports = {
    loadAllPlanets,
    getAllPlanets,
}