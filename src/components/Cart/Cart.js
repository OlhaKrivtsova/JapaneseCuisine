import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import {useContext, useState} from 'react';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import SubmitOrder from './SubmitOrder';

const Cart = props => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState('');

  const cartContext = useContext(CartContext);

  const orders = cartContext.items.map(item => (
    <CartItem
      key={item.id}
      item={item}
      onAddItem={cartContext.addItem.bind(null, {...item, amount: 1})}
      onRemoveItem={cartContext.removeItem.bind(null, item.id)}
      onRemoveALLItem={cartContext.removeItemsWithId.bind(null, item.id)}
    />
  ));

  const orderHandler = () => {
    setIsOrdered(true);
    setError('');
  };

  const divAction = (
    <div className={styles.actions}>
      <button
        className={styles['button--alt_left']}
        onClick={cartContext.clearCart}
      >
        clear
      </button>
      <button className={styles['button--alt']} onClick={props.onCloseCart}>
        close
      </button>
      <button className={styles.button} onClick={orderHandler}>
        order
      </button>
    </div>
  );

  const submitOrderHandler = async user => {
    setIsLoading(true);
    setError('');
    const order = {
      user: user,
      orderedMeals: cartContext.items,
    };

    try {
      const response = await fetch(
        'https://react-project-udemy-92ee9-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {'Content-type': 'application/json'},
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong...');
      }
      const data = await response.json();

      setOrder(data.name);
      console.log(data.name);
      cartContext.clearCart();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  if (!isLoading && !error && order)
    return (
      <Modal onCloseCart={props.onCloseCart}>
        <div className={styles.message}>
          {`Your order ${order} is successful`}
        </div>
        <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onCloseCart}>
            close
          </button>
        </div>
      </Modal>
    );

  if (cartContext.totalCost === 0)
    return (
      <Modal onCloseCart={props.onCloseCart}>
        <div className={styles.message}>Your cart is empty</div>
        <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={props.onCloseCart}>
            close
          </button>
        </div>
      </Modal>
    );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <ul className={styles['cart-items']}>{orders}</ul>
      <div className={styles.total}>
        <span>total</span>
        <span>{`$${cartContext.totalCost.toFixed(2)}`}</span>
      </div>
      {isOrdered && (
        <SubmitOrder
          onCloseCart={props.onCloseCart}
          onSubmit={submitOrderHandler}
        />
      )}
      {isLoading && <p>Sending the order...</p>}
      {error && !isLoading && <p>{`${error} try again`}</p>}
      {!isOrdered && divAction}
    </Modal>
  );
};
export default Cart;
