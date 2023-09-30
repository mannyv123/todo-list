import { describe, it } from 'vitest';
import AddTaskContainer from './AddTaskContainer';
import { screen } from '@testing-library/react';

import { customRender } from '../../tests/test-utils';

describe('AddTaskContainer', () => {
  it('to have been rendered correctly', () => {
    customRender(<AddTaskContainer />);

    const inputElement = screen.getByPlaceholderText('New task..');

    const submitButton = screen.getByText('Add');

    //Assert that elements are in the document

    expect(inputElement).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
