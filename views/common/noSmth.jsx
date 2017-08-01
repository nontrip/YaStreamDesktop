'use babel';

import React from 'react'

export default class NoSmth extends React.Component {
  render() {
    return (
        <div className="donatsMenu unscrollable">
            <div className="text-house-na">
                <h1>Пока нет {this.props.obj}</h1>
            </div>
            <div className="img-house-na">
                <img src="../images/noSmth.svg" width="100"/>
            </div>
        </div>
    )
  }
}
