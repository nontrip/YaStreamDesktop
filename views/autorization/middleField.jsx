'use babel';

import React from 'react';
import ImgHouse from '../common/imgHouse.jsx'

export default class MiddleField extends React.Component {
  render() {
    return (
    <div className="middleField">
        <ImgHouse path='../images/logo.png' />
        <div className="text-house">
                <h1>ЯСтрим</h1>
        </div>
        <div className="hr-div">

        </div>
    </div>)
  }
}
