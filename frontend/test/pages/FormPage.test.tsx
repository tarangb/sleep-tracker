/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing
import FormPage from '../../src/pages/FormPage';

describe('FormPage Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <FormPage />
            </MemoryRouter>
        );
    });

    it('renders Form component', () => {
        expect(screen.getByRole('heading', { name: /enter sleep data/i })).toBeTruthy();
        expect(screen.getByLabelText('Name:')).toBeTruthy();
        expect(screen.getByLabelText('Gender:')).toBeTruthy();
        expect(screen.getByLabelText('Sleep Duration:')).toBeTruthy();
        expect(screen.getByLabelText('Date:')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy();
    });

    // Add more test cases as needed for specific functionality or edge cases

});