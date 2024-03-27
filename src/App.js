import {useState} from 'react';
import Header from './components/layout/Header';
import MealList from './components/Meals/MealList';
import styles from './App.module.css';

import Cart from './components/Cart/Cart';
import CartContextProvider from './Store/CartContextProvider';

const App = () => {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const closeCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <CartContextProvider>
      {cartIsVisible && <Cart onCloseCart={closeCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main className={styles.main}>
        <MealList />
      </main>
    </CartContextProvider>
  );
};

export default App;
