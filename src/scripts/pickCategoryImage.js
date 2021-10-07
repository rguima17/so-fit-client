import cardio from "../assets/icons/cardio.png";
import bike from "../assets/icons/bike.png";
import bodyWorkout from "../assets/icons/muscles.png";
import teamSports from "../assets/icons/teamSports.png";
import rhythmSports from "../assets/icons/rhythmSports.png";

function pickCategoryImage(category) {
  switch (category) {
    case "Cardio":
      return cardio;
    case "Bike":
      return bike;
    case "Body-workout":
      return bodyWorkout;
    case "Rhythm Sports":
      return rhythmSports;
    case "Team Sports":
      return teamSports;
    default:
      return null;
  }
}

export default pickCategoryImage;
