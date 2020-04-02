import React from 'react';
import PollStart from './poll_start'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <PollStart />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});