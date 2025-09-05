const {
  getAllLaunches,
  scheduleLaunch,
  launchExists,
  abortLaunch,
} = require("../../models/launches.model");

// for  pm2 and clusters testing

// function delay(duration) {
//   const startTime = Date.now();

//   while (Date.now() - startTime < duration) {
//     console.log(Date.now() - startTime);
//   }
// }

async function httpGetAllLaunches(req, res) {
  const allLaunches = await getAllLaunches()
   res.status(200).json(allLaunches);
}

async function httpCreateLaunch(req, res) {
  const launch = req.body;

  launch.launchDate = new Date(launch.launchDate);

  if (
    !launch.mission ||
    !launch.target ||
    !launch.launchDate ||
    !launch.rocket
  ) {
    res.status(400).json({
      error: "Details are missing",
    });
  } else if (isNaN(launch.launchDate)) {
    res.status(400).json({
      error: "Date is invalid",
    });
  } else {
    await scheduleLaunch(launch)
    res.status(201).json(launch)
  }

//   if (scheduleLaunch) {
//     res.status(201).json(launch);
//   } else {
//     res.json({
//       error: "failed to create the launch",
//     });
//   }
 }

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id)
  const checkFlightNumber = await launchExists(launchId)
  if(!checkFlightNumber){
    res.status(400).json({
      error : "Launch doesn't exists"
    })
  }
  // const launchId = Number(req.params.id);
  const aborted = await abortLaunch(launchId);
  if (aborted) {
    res.status(200).json({
      ok : true
    });
  } else {
    res.status(400).json({
      error: "failed to abort the mission",
    });
  }
}
module.exports = {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch,
};

