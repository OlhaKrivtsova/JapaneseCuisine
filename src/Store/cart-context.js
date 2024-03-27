import {createContext} from 'react';

const CartContext = createContext({
  items: [],
  totalCost: 0,
  addItem: item => {},
  removeItem: id => {},
  removeItemsWithId: id => {},
  clearCart: () => {},
});

export default CartContext;
