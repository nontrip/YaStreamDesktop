'use babel';

import React from 'react'

export default class ProgressBar extends React.Component {
  render() {
    return (
        <div className="progressBar">
            <p>0</p>
           <div className="layout">
                <p className="in-text">{this.props.progress} руб.</p>
                <div className="layin">
                   
                </div>
           </div>
           <p>{this.props.amount} руб.</p>
        </div>
    )
  }
}