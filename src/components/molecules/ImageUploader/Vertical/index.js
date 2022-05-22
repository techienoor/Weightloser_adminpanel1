import React, { useState, useRef } from "react";
import styles from "./Vertical.module.scss";
import Camera from "icons/Camera";
import classNames from "classnames";
import { CARD_PLACEHOLDER_IMAGE } from "api/RequestInterceptor";

const Vertical = ({
  setFieldValue = () => {},
  error,
  preview,
  viewOnly,
  forUser,
}) => {
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
        disabled={viewOnly}
        type="file"
        className="d-none"
        ref={inputRef}
        onChange={onInputChange}
        accept="image/png, image/jpeg"
      />
      {file ? (
        <img
          className={forUser ? styles.user : ""}
          src={URL.createObjectURL(file)}
        />
      ) : preview ? (
        <img
          className={forUser ? styles.user : ""}
          src={process.env.REACT_APP_IMAGES_URL + preview}
          onError={(el) => {
            el.target.src = CARD_PLACEHOLDER_IMAGE;
          }}
        />
      ) : (
        <div className={styles.upload}>
          <Camera className={styles.icon} />
        </div>
      )}
    </div>
  );
};

export default Vertical;
