'use client';

import { IShopItem } from '@/models/ShopItem';
import { IShopItemVariant } from '@/models/ShopItemVariant';
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
type CartItemVariant = Omit<IShopItemVariant, "id">;
type CartItem = IShopItem & { variants: CartItemVariant[] };

interface CartState {
  cart: CartItem[];
  addItem: (item: IShopItem & CartItemVariant[]) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'CLEAR_CART' };

// Create Context
const CartContext = createContext<CartState | undefined>(undefined);

// Reducer Function
const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item's variants
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          variants: [
            ...updatedCart[existingItemIndex].variants,
            ...action.payload.variants
          ]
        };
        return updatedCart;
      } else {
        // Add new item with variants
        return [...state, action.payload];
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
const initialState: CartItem[] = [];

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

  const addItem = (item: IShopItem & CartItemVariant[]) => {
    const { id, name, description, price, shop_item_type, ...variantData } = item;
    const cartItem: CartItem = {
      id,
      name,
      description,
      price,
      shop_item_type,
      variants: Array.isArray(variantData) ? variantData : [variantData]
    };
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

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