// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from 'react';
import {render} from '@testing-library/react';

import Spinner from "./Spinner"

//spinner works when logging in, when clicking submit upon adding a new article,
// or submit when editing an existing article, and when submitting for deletion

test('sanity', () => {
  render(<Spinner />)
})
