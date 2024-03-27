import {useRef, useState} from 'react';
import styles from './SubmitOrder.module.css';

const validationValue = val => {
  // console.log(val);
  return val.trim() !== '';
};

const SubmitOrder = props => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    address: true,
    phone: true,
  });

  const nameRef = useRef(null);
  // console.log(nameRef.current.value);
  const addressRef = useRef(null);
  const phoneRef = useRef(null);

  const submitHandler = event => {
    event.preventDefault();

    const name = nameRef.current.value;
    const address = addressRef.current.value;
    const phone = phoneRef.current.value;

    const isNameValid = validationValue(name);
    const isAddressValid = validationValue(address);
    const isPhoneValid = validationValue(phone);

    setFormValidity({
      name: isNameValid,
      address: isAddressValid,
      phone: isPhoneValid,
    });

    const isFormValid = isNameValid && isAddressValid && isPhoneValid;

    if (!isFormValid) return;

    console.log(name, address, phone);
    props.onSubmit({name, address, phone});
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
          <p className={styles['text-error']}>enter you name</p>
        )}
      </div>
      <div
        className={`${styles.control} ${
          !formValidity.address ? styles.invalid : ''
        }`}
      >
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' ref={addressRef} />
        {!formValidity.address && (
          <p className={styles['text-error']}>enter you address</p>
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
          <p className={styles['text-error']}>enter you phone number</p>
        )}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Submit</button>
        <button type='button' onClick={props.onCloseCart}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SubmitOrder;
