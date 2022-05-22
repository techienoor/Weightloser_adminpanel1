import Svg from "./Svg";

const Rating = ({ ...rest }) => {
  return (
    <Svg {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2.875rem"
        height="2.875rem"
        viewBox="0 0 46 46"
      >
        <circle
          id="Ellipse_414"
          data-name="Ellipse 414"
          cx="23"
          cy="23"
          r="23"
          fill="#d4dbf8"
        />
        <path
          id="star"
          d="M24.978,9.564a1.329,1.329,0,0,0-1.145-.914L16.6,7.994,13.747,1.3a1.332,1.332,0,0,0-2.449,0L8.441,7.994,1.21,8.65a1.333,1.333,0,0,0-.756,2.329l5.465,4.792-1.611,7.1a1.331,1.331,0,0,0,1.981,1.439l6.234-3.728,6.233,3.728a1.332,1.332,0,0,0,1.982-1.439l-1.611-7.1,5.465-4.792a1.333,1.333,0,0,0,.388-1.415ZM12.642,20.508"
          transform="translate(10.479 10.504)"
          fill="#4885ed"
        />
        <path
          id="Path_9485"
          data-name="Path 9485"
          d="M29.676.984a22.538,22.538,0,0,1,8.175,4.407c4.85,4-23.757,39.252-27.605,36.752a22.569,22.569,0,0,1-5.8-5.5C1.749,33.062,27.372.315,29.676.984Z"
          transform="translate(-1)"
          fill="#fff"
          opacity="0.3"
        />
      </svg>
    </Svg>
  );
};

export default Rating;
