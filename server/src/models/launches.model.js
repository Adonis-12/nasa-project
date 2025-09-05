const launches = require("./launches.mongo");
const planets = require("./planets.mongo");
// const launches = new Map()
// let latestFlightNumber = 1

// saveLaunch(launch)
// launches.set(launch.flightNumber,launch)

async function getAllLaunches() {
  return await launches.find({});
}

async function saveLaunch(launch) {
  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlight() {
  return await launches.findOne().sort("-flightNumber");
}

async function scheduleLaunch(launch) {
  const planet = await planets.findOne({
    kepler_name: launch.target,
  });

  if (!planet) {
    throw new Error("Target is not habitable");
  }
  let latestFlightNumber = await getLatestFlight();
  const newLaunch = Object.assign(launch, {
    flightNumber: latestFlightNumber.flightNumber + 1 || 1,
    upcoming: true,
    success: true,
    customer: ["mayank", "ztm"],
  });
  saveLaunch(newLaunch);
}

async function launchExists(launchId) {
  return await launches.findOne({
    flightNumber: launchId,
  });
}

async function abortLaunch(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  )
  return aborted.modifiedCount == 1
}

module.exports = {
  getAllLaunches,
  scheduleLaunch,
  launchExists,
  abortLaunch,
};
