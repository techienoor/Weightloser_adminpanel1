import React, { useState, useRef } from "react";
import styles from "./ImageUploader.module.scss";
import Camera from "icons/Camera";
import classNames from "classnames";

const ImageUploader = ({ setFieldValue = () => {}, error }) => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  const onInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("ImageFile", file);
      setFile(file);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={classNames(styles.base, `${error ? styles.hasError : ""}`)}
    >
      <input
        type="file"
        className="d-none"
        ref={inputRef}
        onChange={onInputChange}
        accept="image/png, image/jpeg"
      />
      {file ? (
        <img src={URL.createObjectURL(file)} />
      ) : (
        <div className={styles.upload}>
          <Camera className={styles.icon} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
