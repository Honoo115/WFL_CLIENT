import React from 'react';
import PollResult from './poll_result'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <PollResult />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});