'use babel';

import React from 'react'

export default class MiddleUnanswered extends React.Component {
  render() {
    return (
      <div>
        <div>
            <p className="text-unan">{this.props.text}</p>
        </div>
        <div className="btn-ans-house">
          <div className={this.props.id}>
            <img className="canAnswer" src="../images/answer.png" width="117" height="24"/>
          </div>
        </div>
      </div>  
    )
  }
}
