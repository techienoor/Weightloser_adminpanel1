import Icon from "./Icon";

const Message = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.9260625rem"
        height="0.9260625rem"
        viewBox="0 0 14.817 14.817"
      >
        <path
          id="Icon_material-chat-bubble"
          data-name="Icon material-chat-bubble"
          d="M16.335,3H4.482A1.486,1.486,0,0,0,3,4.482V17.817l2.963-2.963H16.335a1.486,1.486,0,0,0,1.482-1.482V4.482A1.486,1.486,0,0,0,16.335,3Z"
          transform="translate(-3 -3)"
          fill="#afafaf"
        />
      </svg>
    </Icon>
  );
};

export default Message;
