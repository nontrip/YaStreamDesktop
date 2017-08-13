'use babel';

import React from 'react'

export default class ProgressBar extends React.Component {
  render() {
    return (
        <div className="progressBar">
            <p>{this.props.progress} </p>
           <div className="layout">
               <div className="layin">
                   
               </div>
           </div>
           <p>{this.props.amount} руб.</p>
        </div>
    )
  }
}