import React, { useState, CSSProperties, useEffect, useRef } from "react";
import styles from "./TextArea.module.scss";
import classNames from "classnames";

const TextArea = ({
  variant = "grayed",
  size,
  previewMode,
  unit,
  className,
  error,
  onChange = () => {},
  disabled,
  value,
  ...rest
}) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  const parentStyle = {
    minHeight: parentHeight,
  };

  const textAreaStyle = {
    height: textAreaHeight,
  };

  useEffect(() => {
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
  }, [value]);

  const onChangeHandler = (event) => {
    setTextAreaHeight("inherit");
    setParentHeight(`${textAreaRef.current?.scrollHeight}px`);
    onChange(event);
  };

  return (
    <div
      className={classNames(
        className,
        styles.input_base,
        styles[variant],
        `${error ? styles.hasError : ""}`,
        previewMode ? styles.previewMode : ""
      )}
      style={parentStyle}
    >
      <textarea
        className={classNames(styles[size])}
        disabled={disabled || previewMode}
        {...rest}
        ref={textAreaRef}
        style={{
          height: textAreaHeight,
        }}
        value={value}
        onChange={onChangeHandler}
        rows={1}
      ></textarea>
      {unit && <span className={styles.unit}>{unit}</span>}
    </div>
  );
};

export default TextArea;
