import styles from "./Upload.module.scss";
import UploadIcon from "icons/Upload";

const Upload = ({ ...rest }) => {
  return (
    <div {...rest} className={styles.base}>
      <span>Upload</span>
      <UploadIcon />
    </div>
  );
};

export default Upload;
