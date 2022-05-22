import Svg from "./Svg";

const ArrowRightAlt = ({ ...rest }) => {
  return (
    <Svg {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsxLink="http://www.w3.org/1999/xlink"
        width="3.6875rem"
        height="3.6875rem"
        viewBox="0 0 59 59"
      >
        <defs>
          <filter
            id="Rectangle_3135"
            x="0"
            y="0"
            width="59"
            height="59"
            filterUnits="userSpaceOnUse"
          >
            <feOffset input="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood flood-opacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_3135)">
          <rect
            id="Rectangle_3135-2"
            data-name="Rectangle 3135"
            width="41"
            height="41"
            rx="20.5"
            transform="translate(9 9)"
            fill="#4885ed"
          />
        </g>
        <path
          id="Icon_awesome-long-arrow-alt-right"
          data-name="Icon awesome-long-arrow-alt-right"
          d="M12.026,12.944H.46A.46.46,0,0,0,0,13.4v2.145a.46.46,0,0,0,.46.46H12.026v1.764a.919.919,0,0,0,1.57.65l3.3-3.3a.919.919,0,0,0,0-1.3l-3.3-3.3a.919.919,0,0,0-1.57.65Z"
          transform="translate(20.919 15.024)"
          fill="#fff"
        />
      </svg>
    </Svg>
  );
};

export default ArrowRightAlt;
