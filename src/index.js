import React from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './TimeLine';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<TimeLine />, document.getElementById('root'));

serviceWorker.unregister();
