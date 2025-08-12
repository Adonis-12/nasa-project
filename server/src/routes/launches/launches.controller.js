const { getAllLaunches, createLaunch , abortLaunch } = require("../../models/launches.model");

function httpGetAllLaunches(req,res){
    res.status(200).json(getAllLaunches())
}

function httpCreateLaunch(req, res) {
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
    createLaunch(launch);
  }

  if (createLaunch) {
    res.status(201).json(launch);
  } else {
    res.json({
      error: "failed to create the launch",
    });
  }
}

function httpAbortLaunch(req,res){
  const launchId = Number(req.params.id)
  const aborted = abortLaunch(launchId)
  if(abortLaunch){
    res.json(aborted)
  }else{
    res.json({
      error: "failed to abort the mission"
    })
  }
}
module.exports = {
  httpGetAllLaunches,
  httpCreateLaunch,
  httpAbortLaunch
};
