import Icon from "./Icon";

const Trash = ({ ...rest }) => {
  return (
    <Icon {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.8175rem"
        height="1.0510625rem"
        viewBox="0 0 13.08 16.817"
      >
        <path
          id="Icon_material-delete-forever"
          data-name="Icon material-delete-forever"
          d="M8.434,19.448A1.874,1.874,0,0,0,10.3,21.317h7.474a1.874,1.874,0,0,0,1.869-1.869V8.237H8.434Zm2.3-6.652,1.317-1.317,1.99,1.981,1.981-1.981L17.338,12.8l-1.981,1.981,1.981,1.981-1.317,1.317L14.04,16.094l-1.981,1.981-1.317-1.317,1.981-1.981ZM17.31,5.434,16.376,4.5H11.7l-.934.934H7.5V7.3H20.58V5.434Z"
          transform="translate(-7.5 -4.5)"
          fill="#e55864"
        />
      </svg>
    </Icon>
  );
};

export default Trash;
