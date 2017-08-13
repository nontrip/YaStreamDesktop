'use babel';

import React from 'react';
import ButtonsPerDonat from './buttonsPerDonat.jsx'

export default class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    // return a boolean value
    return true;
}
  render() {
    let textarea = this.props.donat.answer ? <textarea value={this.props.donat.answer} disabled></textarea> : <textarea placeholder="Введите свой ответ" />
    let active = this.props.donat.answer ? false : true
    return (
    <div className="perDonat">
        <h1><span className="gold">{this.props.donat.sender}</span> отправил {this.props.donat.amount/100} рублей и сказал:</h1>
        <p>{this.props.donat.text_data}</p>
        {textarea}
        <ButtonsPerDonat id={this.props.donat.operation_id} active={active}/>
    </div>)
  }
}