import {useRef, useState} from 'react';
import styles from './SubmitOrder.module.css';

const validationValue = val => {
  return val.trim() !== '';
};

const SubmitOrder = props => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    email: true,
    phone: true,
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const submitHandler = event => {
    event.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;

    const isNameValid = validationValue(name);
    const isEmailValid = validationValue(email);
    const isPhoneValid = validationValue(phone);

    setFormValidity({
      name: isNameValid,
      email: isEmailValid,
      phone: isPhoneValid,
    });

    const isFormValid = isNameValid && isEmailValid && isPhoneValid;

    if (!isFormValid) return;

    props.onSubmit({name, email, phone});
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div
        className={`${styles.control} ${
          !formValidity.name ? styles.invalid : ''
        }`}
      >
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!formValidity.name && (
          <p className={styles['text-error']}>enter your name</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          !formValidity.email ? styles.invalid : ''
        }`}
      >
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' ref={emailRef} />
        {!formValidity.email && (
          <p className={styles['text-error']}>enter your email</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          !formValidity.phone ? styles.invalid : ''
        }`}
      >
        <label htmlFor='phone'>Phone</label>
        <input type='text' id='phone' ref={phoneRef} />
        {!formValidity.phone && (
          <p className={styles['text-error']}>enter your phone number</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCloseCart}>
          Reset
        </button>
        <button className={styles.submit}>Submit</button>
      </div>
    </form>
  );
};

export default SubmitOrder;
