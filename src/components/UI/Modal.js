import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const ModalWindow = props => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onCloseCart}></div>
      <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
};

const Modal = props => {
  const container = document.getElementById('overlay');
  return ReactDOM.createPortal(
    <ModalWindow onCloseCart={props.onCloseCart}>{props.children}</ModalWindow>,
    container
  );
};
export default Modal;
