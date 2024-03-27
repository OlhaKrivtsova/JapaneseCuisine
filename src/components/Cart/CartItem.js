import styles from './CartItem.module.css';

const CartItem = props => {
  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{`$${props.item.price}`}</span>
          <span className={styles.amount}>{`x ${props.item.amount}`}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemoveItem}>−</button>
        <button onClick={props.onAddItem}>+</button>
        <button className={styles.clear} onClick={props.onRemoveALLItem}>
          clear
        </button>
      </div>
    </li>
  );
};

export default CartItem;
