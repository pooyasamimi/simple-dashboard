import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


// ReactDOM.render(<App />, document.getElementById('root'));
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)



