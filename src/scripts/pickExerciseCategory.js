import cardio from "../assets/icons/cardio.png";
import bike from "../assets/icons/bike.png";
import bodyWorkout from "../assets/icons/muscles.png";

function pickCategoryImage(category) {
  switch (category) {
    case "Cardio":
      return cardio;
    case "Bike":
      return bike;
    case "Body-workout":
      return bodyWorkout;
    default:
      return null;
  }
}

export default pickCategoryImage;
