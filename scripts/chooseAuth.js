import React from 'react';
import ReactDOM from 'react-dom';
import ChooseAuthMain from '../views/chooseAuth/chooseAuthMain.jsx';

window.onload = function(){
    ReactDOM.render(<ChooseAuthMain />, document.getElementsByClassName('container')[0]);
}