import Typography from "components/Typography";

const ListPlaceholder = ({ text }) => {
  return (
    <Typography className="d-block text-center text-disabled">
      {text}
    </Typography>
  );
};

export default ListPlaceholder;
