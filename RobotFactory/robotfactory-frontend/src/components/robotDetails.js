import React from "react";
import { Link, useParams } from "react-router-dom";
const axios = require("axios").default;

const RobotDetails = (props) => {
  const { id } = useParams();
  //console.log(id);

  const foundRobot = props.showDetails.find((robot) => id == robot.id);
  //     //console.log(props.robots);

  const moveRobotRight = async (id) => {
    try {
      axios
        .post("http://localhost:3004/robots/right", { id: id })
        .then((res) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  const moveRobotLeft = async (id) => {
    try {
      axios
        .post("http://localhost:3004/robots/left", { id: id })
        .then((res) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  const moveRobotForward = async (id) => {
    try {
      axios
        .post("http://localhost:3004/robots/move", { id: id })
        .then((res) => props.sendGetRequest());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-3">
        <div className="div-navbar">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/ourRobots" className="navbar-link">
            Our Robots
          </Link>
        </div>

        <div className="section-3-banner">
          {foundRobot ? (
            <>
              <h3>Name</h3>
              <p>{foundRobot.name}</p>
              <h3>Position</h3>
              <ul className="ml-3">
                <li>PosX:{foundRobot.posX}</li>
                <li>PosY:{foundRobot.posY}</li>
              </ul>
              <h3>Heading</h3>
              <p>{foundRobot.direction}</p>
              <button
                onClick={() => {
                  moveRobotRight(foundRobot.id);
                }}
              >
                Right
              </button>
              <button
                onClick={() => {
                  moveRobotLeft(foundRobot.id);
                }}
              >
                Left
              </button>
              <button
                onClick={() => {
                  moveRobotForward(foundRobot.id);
                }}
              >
                Move
              </button>
            </>
          ) : null}
        </div>

        <div className="imageshow">
          <img src="../images/robot-factory.jpeg" />
        </div>
      </section>
    </>
  );
};

export default RobotDetails;

// import React from "react";
// import { Link} from "react-router-dom";
// const axios = require("axios").default;

// const RobotDetails = (robot,onUpdate) => {
//   //console.log(props.robots);

// const moveRobotRight = async () => {
//      try {
//      await axios.post('http://localhost:3001/right', { "id": robot.id });
//      onUpdate();
//  } catch (err) {
//      // Handle Error Here
//      console.error(err);

//  }

// }

// const moveRobotLeft = async () => {
//         try {
//           await axios.post("http://localhost:3001/left", { id: robot.id });
//           onUpdate();
//         } catch (err) {
//           // Handle Error Here
//           console.error(err);
//         }

// }

// const moveRobotForward = async () => {
//             try {
//               await axios.post("http://localhost:3001/move", { id: robot.id });
//               onUpdate();
//             } catch (err) {
//               // Handle Error Here
//               console.error(err);
//             }

// }

//   return (
//     <>
//       <div className="container mt-5">
//         <Link to="/">Go Back To Main</Link>
//         <h3>Name :</h3>
//         <p>{robot.name}</p>
//         <h4>Position :</h4>
//         <ul className="ml-3">
//           <li className="listStyle">PosX: {robot.posX}</li>
//           <li className="listStyle">PosY:{robot.posY}</li>
//         </ul>
//         <h4>Heading :</h4>
//         <p>NORTH</p>
//         <h6 className="ml-3">{robot.heading}</h6>
//         <button
//           onClick= {moveRobotRight}
//           className="btn btn-secondary btn-xl mr-2 pr-3 pl-3"
//         >
//           Right
//         </button>
//         <button
//           onClick={moveRobotLeft}
//           className="btn btn-secondary btn-xl mr-2 pr-3 pl-3"
//         >
//           Left
//         </button>
//         <button
//           onClick={moveRobotForward}
//           className="btn btn-secondary btn-xl mr-2 pr-3 pl-3"
//         >
//           Move
//         </button>
//       </div>
//       )
//     </>
//   );
// };

// export default RobotDetails;
