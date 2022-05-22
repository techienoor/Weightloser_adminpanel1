import axios from "axios";
import UserImage from "assets/images/user.svg";
import ExerciseImage from "assets/images/exercise.webp";
import CardPlaceholderImage from "assets/images/placeholder-image.jpg";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // timeout: 4000,
});
export const apiFormData = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const getImage = (imageName) => {
  return process.env.REACT_APP_IMAGES_URL + imageName;
};

export const USER_THUMBNAIL = UserImage;
export const EXERCISE_IMAGE = ExerciseImage;
export const CARD_PLACEHOLDER_IMAGE = CardPlaceholderImage;

export default api;
