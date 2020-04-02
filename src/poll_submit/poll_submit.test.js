import React from 'react';
import PollSubmit from './poll_submit'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <BrowserRouter>
            <PollSubmit />
        </BrowserRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});