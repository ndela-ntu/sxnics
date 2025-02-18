"use client";

import { IShopItem } from "@/models/ShopItem";
import { IShopItemVariant } from "@/models/ShopItemVariant";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// Types
interface CartEntry {
  item: IShopItem;
  variant: IShopItemVariant;
}

interface CartState {
  cart: CartEntry[];
  addItem: (item: IShopItem, variant: IShopItemVariant) => void;
  removeItem: (itemId: number, variantId: number) => void;
  clearCart: () => void;
}

type Action =
  | { type: "ADD_ITEM"; payload: CartEntry }
  | { type: "REMOVE_ITEM"; payload: { itemId: number; variantId: number } }
  | { type: "CLEAR_CART" };

// Create Context
const CartContext = createContext<CartState | undefined>(undefined);

// Reducer Function
const cartReducer = (state: CartEntry[], action: Action): CartEntry[] => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingEntryIndex = state.findIndex(
        (entry) =>
          entry.item.id === action.payload.item.id &&
          entry.variant.id === action.payload.variant.id
      );

      if (existingEntryIndex >= 0) {
        // Update existing entry's quantity
        const updatedCart = [...state];
        updatedCart[existingEntryIndex] = {
          ...updatedCart[existingEntryIndex],
          variant: {
            ...updatedCart[existingEntryIndex].variant,
            quantity:
              updatedCart[existingEntryIndex].variant.quantity +
              action.payload.variant.quantity,
          },
        };
        return updatedCart;
      } else {
        // Add new entry
        return [...state, action.payload];
      }
    }
    case "REMOVE_ITEM":
      return state.filter(
        (entry) =>
          !(
            entry.item.id === action.payload.itemId &&
            entry.variant.id === action.payload.variantId
          )
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const initialState: CartEntry[] = [];

interface CartProviderProps {
  children: ReactNode;
}

// Provider Component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : [];
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: IShopItem, variant: IShopItemVariant) => {
    dispatch({ type: "ADD_ITEM", payload: { item, variant } });
  };

  const removeItem = (itemId: number, variantId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId, variantId } });
  };

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

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
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
