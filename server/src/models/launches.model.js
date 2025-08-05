const launches = new Map()

const launch = {
    flightNumber: 1,
    mission : 'mission sindoor',
    customer: ['mayank', 'lakshita'],
    launchDate: new Date('2025-08-04'),
    rocketType: 'Explorer-1S1',
    destination:'kepler-51',
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber,launch)

module.exports = launches
