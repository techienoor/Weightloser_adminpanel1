import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Close from "icons/Close";
import styles from "./Modal.module.scss";
import classNames from "classnames";

const modalRoot = document.getElementById("modal-root");

const ModalBase = ({ children }) => {
  const el = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

const Modal = ({ isOpen, onClose = () => {}, size = "", children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalBase>
      <div className={classNames(styles.modal)}>
        <div className={classNames(styles.modal_content, styles[size])}>
          <Close className={styles.icon_close} clickable onClick={onClose} />
          {children}
        </div>
      </div>
    </ModalBase>
  );
};

export default Modal;
