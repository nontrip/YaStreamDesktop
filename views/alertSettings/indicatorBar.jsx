'use babel';

import React from 'react';

export default class IndicatorBar extends React.Component {
  render() {
    return (
    <div className="indicatorBar">
        <ul className="ul-left">
            <li className="ul-left-text">
                <ul>
                    <li>Цвет индикатора: </li>
                    <li>Цвет фона индикатора: </li>
                </ul>
            </li>
            <li className="ul-left-text"> 
                <ul>
                    <li><input id="indi-color" readOnly type="text"></input></li>
                    <li><input id="indiBack-color" readOnly type="text"></input></li>
                </ul>
            </li>
        </ul>
         <ul className="ul-right">
            <li className="ul-right-text">
                <ul>
                    <li>Цвет шрифта: </li>
                    <li>Цвет фона: </li>
                </ul>
            </li>
            <li className="ul-right-text"> 
                <ul>
                    <li><input id="font-color" readOnly type="text"></input></li>
                    <li><input id="back-color" placeholder="сейчас прозрачный" readOnly type="text"></input></li>
                </ul>
            </li>
        </ul>
    </div>)
  }
}


/*
<li><p>Цвет индикатора: </p><input readOnly type="text"></input></li>
            <li><p>Цвет фона индикатора: </p><input readOnly type="text"></input></li>
*/