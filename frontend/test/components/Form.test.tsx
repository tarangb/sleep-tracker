/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Form from '../../src/components/Form';
import { submitSleepData } from '../../src/services/api';

jest.mock('../../src/services/api', () => ({
    submitSleepData: jest.fn(),
}));

describe('Form component', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Form />
            </BrowserRouter>
        );
    });

    it('renders form elements correctly', () => {
        expect(screen.getByText('Enter Sleep Data')).toBeTruthy();
        expect(screen.getByLabelText('Name:')).toBeTruthy();
        expect(screen.getByLabelText('Gender:')).toBeTruthy();
        expect(screen.getByLabelText('Sleep Duration:')).toBeTruthy();
        expect(screen.getByLabelText('Date:')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
    });

    it('validates form fields and prevents submission with invalid data', async () => {
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitButton); // Click submit without entering any data

        expect(await screen.findByText('Name is required')).toBeTruthy();
        expect(await screen.findByText('Gender is required')).toBeTruthy();
        expect(await screen.findByText('Date is required')).toBeTruthy();

        // Ensure submitSleepData is not called when form is invalid
        expect(submitSleepData).not.toHaveBeenCalled();
    });

    it('submits form data successfully', async () => {
        // Mock the API response
        (submitSleepData as jest.Mock).mockResolvedValueOnce({ status: 200 });
    
        // Render the form component
        const { container } = render(
          <BrowserRouter>
                <Form />
            </BrowserRouter>
        );
    
        // Get the form within the rendered component
        const form = container.querySelector('form');
        if (form) {
          const withinForm = within(form);
          await userEvent.type(withinForm.getByLabelText('Name:'), 'John');
          await userEvent.selectOptions(withinForm.getByLabelText('Gender:'), 'Male');
          await userEvent.selectOptions(withinForm.getByLabelText('Sleep Duration:'), '8');
          fireEvent.change(withinForm.getByLabelText('Date:'), { target: { value: '2023-07-10' } });
    
          // Submit the form
          fireEvent.submit(withinForm.getByRole('button', { name: 'Submit' }).closest('form') as HTMLFormElement);
              
          // Wait for the async actions to complete
          await act(async () => {});
    
          // Expect submitSleepData to be called with correct data
          expect(submitSleepData).toHaveBeenCalledWith({
            name: 'John',
            gender: 'Male',
            sleepDuration: 8,
            date: '2023-07-10',
          });
        }
      });
});
