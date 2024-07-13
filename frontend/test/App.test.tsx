/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

// Mock your pages (FormPage and DataPage) for testing
jest.mock('../src/pages/FormPage', () => () => <div>Form Page</div>);
jest.mock('../src/pages/DataPage', () => () => <div>Data Page</div>);

describe('App component', () => {
  it('renders the FormPage component at the root path', () => {
    render(<App />);
    expect(screen.getByText('Form Page')).toBeTruthy();
  });

  // it('renders the FormPage component at the /form path', () => {
  //   render(<App />);
  //   const formLink = screen.getByRole('link', { name: '/form' });
  //   userEvent.click(formLink); // Simulate user click on the link
  //   expect(screen.getByText('Form Page')).toBeTruthy();
  // });

  // it('renders the DataPage component at the /data path', () => {
  //   render(<App />);

  //   // Look for the link by its accessible name
  //   const dataLink = screen.getByRole('link', { name: '/data' });
  //   userEvent.click(dataLink); // Simulate user click on the link

  //   // Expect the Data Page to be rendered
  //   expect(screen.getByText('Data Page')).toBeTruthy();
  // });
});
