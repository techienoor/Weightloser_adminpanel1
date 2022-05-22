import Icon from "./Icon";

const Attachment = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.287375rem"
        height="1.539875rem"
        viewBox="0 0 20.598 24.638"
      >
        <path
          id="Icon_material-attach-file"
          data-name="Icon material-attach-file"
          d="M20.033,6.517v11.54a4.014,4.014,0,1,1-8.028,0V5.514a2.509,2.509,0,0,1,5.017,0V16.051a1,1,0,1,1-2.007,0V6.517H13.51v9.533a2.509,2.509,0,0,0,5.017,0V5.514a4.014,4.014,0,0,0-8.028,0V18.058a5.519,5.519,0,1,0,11.038,0V6.517Z"
          transform="translate(2.695 -6.549) rotate(30)"
          fill="#797a7a"
        />
      </svg>
    </Icon>
  );
};

export default Attachment;
