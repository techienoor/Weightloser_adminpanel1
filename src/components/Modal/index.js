import React from "react";
import ReactModal from "react-modal";
import Close from "icons/Close";
import styles from "./Modal.module.scss";
import classNames from "classnames";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ isOpen, onClose, children, size }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={classNames(styles.Modal, styles[size])}
      shouldCloseOnOverlayClick={false}
      overlayClassName={styles.Overlay}
      appElement={modalRoot}
    >
      {onClose && (
        <Close className={styles.icon_close} clickable onClick={onClose} />
      )}
      {children}
    </ReactModal>
  );
};

export default Modal;
