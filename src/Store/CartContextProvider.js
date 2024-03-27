import CartContext from './cart-context';
import {useReducer} from 'react';

const cartReducer = (prev, action) => {
  if (action.type === 'ADD_ITEM') {
    const updateTotalCost = Number(
      (prev.totalCost + action.item.price * action.item.amount).toFixed(2)
    );
    const itemIndex = prev.items.findIndex(item => item.id === action.item.id);
    if (itemIndex === -1)
      return {
        items: prev.items.concat(action.item),
        totalCost: updateTotalCost,
      };
    else {
      const updateAmount = prev.items[itemIndex].amount + action.item.amount;
      // const updateItem = {...prev.items[itemIndex], amount: updateAmount};
      prev.items[itemIndex].amount = updateAmount;
      // prev.items[itemIndex] = updateItem;
      return {items: [...prev.items], totalCost: updateTotalCost};
    }
  }

  if (action.type === 'REMOVE_ITEM') {
    const itemIndex = prev.items.findIndex(item => item.id === action.id);
    const updateAmount = prev.items[itemIndex].amount - 1;
    const updateTotalCost = +(
      prev.totalCost - prev.items[itemIndex].price
    ).toFixed(2);
    if (updateAmount > 0) {
      prev.items[itemIndex].amount = updateAmount;
      return {items: [...prev.items], totalCost: updateTotalCost};
    } else {
      const updateItems = prev.items.filter(item => item.id !== action.id);
      return {items: updateItems, totalCost: updateTotalCost};
    }
  }

  if (action.type === 'CLEAR_BY_ID') {
    const updateItems = prev.items.filter(item => item.id !== action.id);

    const updateTotalCost = updateItems.reduce(
      (acc, item) => +(acc + item.price * item.amount).toFixed(2),
      0
    );

    return {items: updateItems, totalCost: updateTotalCost};
  }

  if (action.type === 'CLEAR_CART') {
    return {items: [], totalCost: 0};
  }

  return prev;
};

const CartContextProvider = props => {
  const [cartItems, dispatchCartItems] = useReducer(cartReducer, {
    items: [],
    totalCost: 0,
  });
  const addItem = item => {
    dispatchCartItems({type: 'ADD_ITEM', item});
  };
  const removeItem = id => {
    dispatchCartItems({type: 'REMOVE_ITEM', id});
  };
  const removeItemsWithId = id => {
    dispatchCartItems({type: 'CLEAR_BY_ID', id});
  };
  const clearCart = () => {
    dispatchCartItems({type: 'CLEAR_CART'});
  };

  return (
    <CartContext.Provider
      value={{
        items: cartItems.items,
        totalCost: cartItems.totalCost,
        addItem,
        removeItem,
        removeItemsWithId,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
