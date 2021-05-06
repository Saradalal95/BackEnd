const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
// const isEmpty = require("lodash.isempty");
exports.getRobots = (req, res) => {
  try {
    const robots = db.get("robots").value();
    res.status(200).send(robots);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.addRobots = (req, res, next) => {
  try {
    if (req.body.name === "") {
      const error = new Error("Invalid request message");
      error.status = 400;
      error.stack = null;
      next(error);
    } else {
      const robot = req.body;
      db.get("robots")
        .push(robot)
        .last()
        .assign({ id: Math.floor(Math.random() * 10).toString() })
        .write();
      res.status(201).send(robot);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.deleteRobot = (req, res, next) => {
  try {
    const inputId = req.body.id;
    db.get("robots").remove({ id: inputId }).write();
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

turnRight = (direction) => {
  switch (direction) {
    case "NORTH":
      return "EAST";
    case "EAST":
      return "SOUTH";
    case "SOUTH":
      return "WEST";
    case "WEST":
      return "NORTH";
    default:
      return direction;
  }
};

turnLeft = (direction) => {
  switch (direction) {
    case "NORTH":
      return "WEST";
      break;
    case "EAST":
      return "NORTH";
      break;
    case "SOUTH":
      return "EAST";
      break;
    case "WEST":
      return "SOUTH";
    default:
      return direction;
  }
};
moveForward = (direction, posX, posY) => {
  console.log(direction);
  switch (direction) {
    case "NORTH":
      return { posX: posX, posY: posY + 1 };
    case "EAST":
      return { posX: posX + 1, posY: posY };
    case "SOUTH":
      return { posX: posX, posY: posY - 1 };
    case "WEST":
      return { posX: posX - 1, posY: posY };
    default:
      return { posX: null, posY: null };
  }
};

exports.rotateRight = (req, res, next) => {
  try {
    const robotId = req.body.id;
    const robot = db.get("robots").find({ id: robotId }).value();
    db.get("robots")
      .find({ id: robotId })
      .assign({
        direction: turnRight(robot.direction),
      })
      .write();
    res.status(200).send(robot);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.rotateLeft = (req, res, next) => {
  try {
    const robotId = req.body.id;
    const robot = db.get("robots").find({ id: robotId }).value();
    db.get("robots")
      .find({ id: robotId })
      .assign({
        direction: turnLeft(robot.direction),
      })
      .write();
    res.status(200).send(robot);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.moveRobot = (req, res, next) => {
  try {
    const robotId = req.body.id;
    const robot = db.get("robots").find({ id: robotId }).value();
    const coordinates = moveForward(robot.direction, robot.posX, robot.posY);
    db.get("robots")
      .find({ id: robotId })
      .assign({
        posX: coordinates.posX,
        posY: coordinates.posY,
      })
      .write();
    res.status(200).send(robot);
    console.log(coordinates);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
