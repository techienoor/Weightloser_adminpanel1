import Icon from "./Icon";

const TrashAlt = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.7695625rem"
        height="0.615625rem"
        viewBox="0 0 12.313 9.85"
      >
        <path
          id="Icon_material-delete-sweep"
          data-name="Icon material-delete-sweep"
          d="M11,13.387h2.462v1.231H11Zm0-4.925h4.309V9.694H11Zm0,2.463H14.7v1.231H11ZM3.616,14.619A1.235,1.235,0,0,0,4.847,15.85H8.541a1.235,1.235,0,0,0,1.231-1.231V8.462H3.616Zm6.772-8H8.541L7.925,6H5.463l-.616.616H3V7.847h7.387Z"
          transform="translate(-3 -6)"
          fill="#e55864"
        />
      </svg>
    </Icon>
  );
};

export default TrashAlt;
