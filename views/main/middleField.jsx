'use babel';

import React from 'react';
import ImgHouse from '../common/imgHouse.jsx'

export default class MiddleField extends React.Component {
  render() {
    return (
    <div className="middle-field">
        <ImgHouse path="../images/ava.png" />
        <p>{this.props.balance} руб.</p>
        <h1>{this.props.number}</h1>
        <div className="hr-div">

        </div>
    </div>)
  }
}
