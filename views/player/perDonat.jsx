'use babel';

import React from 'react';
import ButtonsPerDonat from './buttonsPerDonat.jsx'

export default class Header extends React.Component {
  render() {
    return (
    <div className="perDonat">
        <h1><span className="gold">{this.props.donat.sender}</span> отправил {this.props.donat.amount/100} рублей и сказал:</h1>
        <p>{this.props.donat.text_data}</p>
        <textarea placeholder="Введите свой ответ" /> 
        <ButtonsPerDonat />
    </div>)
  }
}