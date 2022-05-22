import { useRef, useState } from "react";
import styles from "./AVUploader.module.scss";
import Typography from "components/Typography";
import Upload from "icons/Upload";

const TYPES = {
  video: "video/mp4,video/x-m4v,video/*",
};

const VideoUploader = ({ onChange = () => {}, text, type }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
    onChange(e.target.files[0]);
  };

  return (
    <>
      <input
        type="file"
        className="d-none"
        ref={inputRef}
        onChange={handleChange}
        accept={TYPES[type]}
      />
      <div className={styles.base} onClick={handleClick}>
        <Typography>{text || "Upload Video"}</Typography>
        <Upload />
      </div>
      <Typography block variant="small">
        {file?.name}
      </Typography>
    </>
  );
};

export default VideoUploader;
