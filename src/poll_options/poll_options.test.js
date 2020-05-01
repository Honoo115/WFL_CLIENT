import React from 'react';
import PollOptions from './poll_options'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <PollOptions match={{ params: { id: 1 } }} />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});