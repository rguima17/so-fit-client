import { useHistory, NavLink } from "react-router-dom";
import rankingImg from "../../assets/icons/ranking.png";
import soFitLogo from "../../assets/img/Logo.png";


function ViewUserCard(props) {
  
 
  const history = useHistory();
  return (
    
    <div className=" mx-auto my-2 mx-2 lg:flex  lg:max-w-3xl  lg:mt-8 ">
      <div className=" lg:mt-0 md:w-1/2  rounded-t-xl  lg: lg:rounded-l-xl lg:rounded-t-none"  style={{backgroundColor:"#6366F1"}}>
        <div className="   max-w-lg flex items-center justify-center lg:justify-end   ">
          <span className="whitespace-nowrap text-sm font-medium  ">
            <i
              className="fas fa-arrow-circle-left text-indigo-600 hover:text-indigo-900 text-3xl absolute top-20 left-6   "
              onClick={() => history.goBack()}
            ></i>
          </span>
     
          <img
            className="object-cover object-top rounded-t-xl  lg:rounded-l-xl  lg:rounded-r-none border-black border-b lg:border-none "
            src={props.pictureUrl}
            alt={`User ${props.name}`}
          />
        </div>
      </div>

      <div className="md:w-1/2 max-w-lg bg-white px-3 py-3 rounded-b-xl lg:rounded-r-xl  lg:rounded-l-none lg:border-black lg:border-l" >
        <div className="flex flex-row justify-between">
          <h2 className="text-3xl font-bold ">{props.name}</h2>
          <button
            className="font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 rounded-lg w-1/3 md:w-36"
            onClick={props.handleFollow}
          >
            {props.buttonClick ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="lg:max-w-md my-6 lg:mt-6 text-gray-600">{props.description}</div>
        <div className="flex justify-around items-center mt-4">
          <div className="text-center">
            <h4 className="font-medium text-gray-600  text-lg">Followers</h4>

            {props.followersNumber === 0 ? (
              <div className="flex text-center items-center overflow-hidden mt-2 mr-3">
                <div className="  pt-1 inline-block text-center h-8 w-8 rounded-full text-black border-2 border-white object-cover object-center">
                  {" "}
                  0{" "}
                </div>
              </div>
            ) : (
              <div className="flex items-center overflow-hidden mt-2">
                <div className=" invisible inline-block  font-bold h-8 w-8 text-white rounded-full text-white border-2 bg-black border-white"></div>
                {props.followerPictures
                  .filter((pic, index) => index < 3)
                  .map((pic, index) => {
                    return (
                      <img
                        key={pic + index}
                        className=" -ml-2 inline-block h-8 w-8 rounded-full text-white border-2 border-white object-cover object-center"
                        src={pic}
                        alt=""
                      ></img>
                    );
                  })}

                {props.followerPictures.length <= 3 ? (
                  " "
                ) : (
                  <div className="flex items-center text-xs justify-center  w-8 h-8 rounded-full bg-gray-200   -ml-2">
                    {" "}
                    {`+${props.followerPictures.length - 3}`}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center">
            <h4 className="font-medium text-gray-600 text-lg">Following</h4>

            {props.followingNumber === 0 ? (
              <div className="flex text-center justify-center items-center overflow-hidden mt-2 ml-4">
                <div className=" pt-1 inline-block text-center h-8 w-8 rounded-full text-black border-2 border-white object-cover object-center">
                  {" "}
                  0{" "}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center overflow-hidden mt-2 mr-3 ">
                <div className="invisible inline-block  font-bold h-8 w-8 text-white rounded-full text-white border-2 bg-black border-white"></div>
                {props.followingPictures
                  .filter((pic, index) => index < 3)
                  .map((pic, index) => {
                    return (
                      <img
                        key={pic + index}
                        className=" -ml-2 inline-block h-8 w-8 rounded-full text-white border-2 border-white object-cover object-center"
                        src={pic}
                        alt=""
                      ></img>
                    );
                  })}

                {props.followingPictures.length <= 3 ? (
                  " "
                ) : (
                  <div className="flex items-center text-xs justify-center  w-8 h-8 rounded-full bg-gray-200   -ml-2">
                    {" "}
                    {`+${props.followingPictures.length - 3}`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-around items-center">
          <div className="text-center my-9">
            <h4 className=" text-lg font-medium text-gray-600">Level</h4>
            <div className="flex items-center justify-center m-1">
              <span className="font-medium text-3xl text-gray-600">
                {props.level}
                <img
                  className="ml-2"
                  src={rankingImg}
                  alt="ranking-icon"
                  style={{ height: "32px", display: "inline" }}
                />
              </span>
            </div>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium text-gray-600">So Fi Points</h4>
            <div className="flex items-center justify-center m-1">
              <span className="text-3xl font-medium text-gray-600 ">
                {Number(props.soFitPoints.toFixed(0)).toLocaleString("pt-BR")}
                <img
                  className=" ml-2 "
                  src={soFitLogo}
                  alt="soFit-icon"
                  style={{ height: "32px", display: "inline" }}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full text-center animate-bounce mt-2">
        <NavLink
              to={`/posts/users/${props.id}`}
              className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600  text-center"
            >
              {props.name} Posts
            </NavLink>
            </div> 
      </div>
     </div>

 
  );
}

export default ViewUserCard;
