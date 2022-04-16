import { createRoot, render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/index';



test('renders Payout report', () => {
  render( <Provider store={store}> <App /> </Provider>);
  const linkElement = screen.getByText(/Get total payout/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders Device Count report', () => {
  render( <Provider store={store}> <App /> </Provider>);
  const linkElement = screen.getByText(/Get device count/i);
  expect(linkElement).toBeInTheDocument();
});

