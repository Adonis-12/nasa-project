const launches = new Map()
let latestFlightNumber = 1

const launch = {
    flightNumber: 1,
    mission : 'mission sindoor',
    target:"pakistan",
    rocket:'rafael',
    customer: ['mayank', 'lakshita'],
    launchDate: new Date('2025-08-04'),
    rocketType: 'Explorer-1S1',
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber,launch)

function getAllLaunches(){
    return Array.from(launches.values())
}

function createLaunch(launch){
    latestFlightNumber++
    launches.set(latestFlightNumber,Object.assign(launch,{
        flightNumber : latestFlightNumber,
        customer :["ZTM","mayank"],
        upcoming:true,
        success:true
    }))
console.log(launches)
}

function abortLaunch(launchId){
    let aborted = launches.get(launchId)
    aborted.upcoming = false
    aborted.success = false
    return aborted
}
module.exports ={
    getAllLaunches,
    createLaunch,
    abortLaunch
}
