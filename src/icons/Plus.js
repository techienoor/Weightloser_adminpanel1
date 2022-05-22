import Icon from "./Icon";

const Plus = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.129375rem"
        viewBox="0 0 18.07 18.07"
      >
        <path
          id="Icon_ionic-ios-add"
          data-name="Icon ionic-ios-add"
          d="M25.91,16.875H19.125V10.09a1.125,1.125,0,0,0-2.25,0v6.785H10.09a1.125,1.125,0,0,0,0,2.25h6.785V25.91a1.125,1.125,0,0,0,2.25,0V19.125H25.91a1.125,1.125,0,0,0,0-2.25Z"
          transform="translate(-8.965 -8.965)"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export default Plus;
