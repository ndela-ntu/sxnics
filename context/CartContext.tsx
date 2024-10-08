'use client';

import { IShopItem } from '@/models/ShopItem';
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';


interface CartState {
  cart: IShopItem[];
  addItem: (item: IShopItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

// Create Context
const CartContext = createContext<CartState | undefined>(undefined);

// Reducer Function
type Action =
  | { type: 'ADD_ITEM'; payload: IShopItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: IShopItem[], action: Action): IShopItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item }
            : item
        );
      } else {
        return [...state, { ...action.payload }];
      }
    }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// Initial State
const initialState: IShopItem[] = [];

// Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: IShopItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = (): CartState => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
