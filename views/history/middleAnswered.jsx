'use babel';

import React from 'react'

export default class MiddleAnswered extends React.Component {
  render() {
    return (
        <div className="middleField-uns">
            <div>
              <p className="text-uns">{this.props.text}</p>
            </div>
            <div className="img-house-uns">
              <div className={this.props.id}>
                <img className="arrow to-rotate" src="../images/showreply.png" width="14" height="22"/>
              </div>
            </div>
            <div className="answered">
              
            </div>
        </div>
    )
  }
}
