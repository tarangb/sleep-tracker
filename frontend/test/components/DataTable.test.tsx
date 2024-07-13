/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Stats } from '../../src/interfaces';
import DataTable from '../../src/components/DataTable';
import { getSleepStats } from '../../src/services/api'; // Mock this import

jest.mock('../../src/services/api'); // Mock the API call

describe('DataTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it('renders table rows correctly with mock data', async () => {
    // Mock data to be returned from the API call
    const mockStats: Stats[] = [
      { name: 'Alice', gender: 'Female', count: 3 },
      { name: 'Bob', gender: 'Male', count: 5 },
    ];

    // Mock implementation of getSleepStats
    (getSleepStats as jest.Mock).mockResolvedValue(mockStats);

    // Mock function for onRowClick
    const mockOnRowClick = jest.fn();

    // Render the DataTable component with mocked props
    const { getByText, getByTitle } = render(
      <DataTable onRowClick={mockOnRowClick} />
    );

    // Wait for the API call to complete and component to update
    await waitFor(() => {
      // Check if table rows are rendered correctly
      expect(getByText('Alice')).toBeTruthy();
      expect(getByText('Bob')).toBeTruthy();
    });

    // Simulate click event on a table row
    fireEvent.click(getByText('Alice')); // Simulate click on Alice's row

    // Verify that onRowClick function is called with correct arguments
    expect(mockOnRowClick).toHaveBeenCalledWith('Alice', 'Female');
  });
});
