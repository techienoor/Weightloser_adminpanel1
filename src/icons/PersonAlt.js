import Icon from "./Icon";

const PersonAlt = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.7944375rem"
        height="1.7944375rem"
        viewBox="0 0 28.711 28.711"
      >
        <path
          id="Icon_material-person"
          data-name="Icon material-person"
          d="M20.355,20.355a7.178,7.178,0,1,0-7.178-7.178A7.176,7.176,0,0,0,20.355,20.355Zm0,3.589C15.564,23.944,6,26.349,6,31.122v3.589H34.711V31.122C34.711,26.349,25.147,23.944,20.355,23.944Z"
          transform="translate(-6 -6)"
          fill="#afafaf"
        />
      </svg>
    </Icon>
  );
};

export default PersonAlt;
