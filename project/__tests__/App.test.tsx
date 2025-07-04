import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AppHeader from '../components/AppHeader';
import NotificationList from '../components/NotificationList';
import ProductCard from '../components/ProductCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { CartContext } from '../context/CartContext';
import { NotificationContext } from '../context/NotificationContext';

// AppHeader test
describe('AppHeader', () => {
  it('renders the title', () => {
    const { getByText } = render(<AppHeader title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });
});

describe('NotificationList', () => {
  it('shows empty state', () => {
    const contextValue = { notifications: [], markAsRead: jest.fn(), clearNotifications: jest.fn(), addNotification: jest.fn() };
    const { getByText } = render(
      <NotificationContext.Provider value={contextValue}>
        <NotificationList visible onClose={jest.fn()} />
      </NotificationContext.Provider>
    );
    expect(getByText('No notifications')).toBeTruthy();
  });
});

describe('ProductCard', () => {
  it('calls addToCart when add to cart pressed', () => {
    const addToCart = jest.fn();
    const product = { id: '1', name: 'Test', image: '', price: 10 };
    const { getByLabelText } = render(
      <CartContext.Provider value={{ addToCart, cartItems: [], removeFromCart: jest.fn(), updateQuantity: jest.fn(), updateNote: jest.fn(), getSubtotal: jest.fn(), getTotal: jest.fn(), clearCart: jest.fn(), itemCount: 0 }}>
        <ProductCard product={product} />
      </CartContext.Provider>
    );
    fireEvent.press(getByLabelText('Add Test to cart, price 10.00'));
    expect(addToCart).toHaveBeenCalled();
  });
});

describe('ErrorBoundary', () => {
  it('renders fallback UI on error', () => {
    const ProblemChild = () => { throw new Error('Oops!'); };
    const { getByText } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(getByText('Something went wrong.')).toBeTruthy();
    expect(getByText('Oops!')).toBeTruthy();
  });
});

