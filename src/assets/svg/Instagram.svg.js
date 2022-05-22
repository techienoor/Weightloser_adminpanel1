import Svg from "./Svg";

const Instagram = ({ ...rest }) => {
  return (
    <Svg {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.119"
            y1="0.881"
            x2="0.83"
            y2="0.17"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#fee411" />
            <stop offset="0.052" stop-color="#fedb16" />
            <stop offset="0.138" stop-color="#fec125" />
            <stop offset="0.248" stop-color="#fe983d" />
            <stop offset="0.376" stop-color="#fe5f5e" />
            <stop offset="0.5" stop-color="#fe2181" />
            <stop offset="1" stop-color="#9000dc" />
          </linearGradient>
        </defs>
        <g id="instagram" transform="translate(-31.647 -31.647)">
          <circle
            id="Ellipse_417"
            data-name="Ellipse 417"
            cx="12"
            cy="12"
            r="12"
            transform="translate(31.647 31.647)"
            fill="url(#linear-gradient)"
          />
          <g
            id="Group_17871"
            data-name="Group 17871"
            transform="translate(36.602 36.596)"
          >
            <path
              id="Path_9500"
              data-name="Path 9500"
              d="M140.842,131h-5.387a4.357,4.357,0,0,0-4.355,4.355v5.387a4.357,4.357,0,0,0,4.355,4.355h5.387a4.357,4.357,0,0,0,4.355-4.355v-5.387A4.357,4.357,0,0,0,140.842,131Zm2.781,9.747a2.789,2.789,0,0,1-2.787,2.787h-5.387a2.789,2.789,0,0,1-2.787-2.787V135.36a2.789,2.789,0,0,1,2.787-2.787h5.387a2.789,2.789,0,0,1,2.787,2.787Z"
              transform="translate(-131.1 -131)"
              fill="#fff"
            />
            <path
              id="Path_9501"
              data-name="Path 9501"
              d="M195.7,192.1a3.6,3.6,0,1,0,3.6,3.6A3.611,3.611,0,0,0,195.7,192.1Zm0,5.793a2.189,2.189,0,1,1,2.189-2.189A2.191,2.191,0,0,1,195.7,197.893Z"
              transform="translate(-188.659 -188.653)"
              fill="#fff"
            />
            <circle
              id="Ellipse_418"
              data-name="Ellipse 418"
              cx="0.609"
              cy="0.609"
              r="0.609"
              transform="matrix(0.987, -0.16, 0.16, 0.987, 10.128, 2.737)"
              fill="#fff"
            />
          </g>
        </g>
      </svg>
    </Svg>
  );
};

export default Instagram;
