const express = require("express");
const router = express.Router();
const {
  getRobots,
  addRobots,
  deleteRobot,
  rotateRight,
  rotateLeft,
  moveRobot,
} = require("../controller/robotsController");
router.route("/").get(getRobots).post(addRobots).delete(deleteRobot);
router.route("/right").post(rotateRight);
router.route("/left").post(rotateLeft);
router.route("/move").post(moveRobot);
module.exports = router;
