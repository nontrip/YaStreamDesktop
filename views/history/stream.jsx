'use babel';

import React from 'react';

export default class Stream extends React.Component {
  render() {
      let date = this.props.streamInfo.end_date
      date = date.replace('T', ' ')
    return (
        <div>
    <div className="stream">
        <div className="stream-house">
            <div className="img-house-stream">
                <img src="../images/streamPreview.png" width="107" height="67"/>
            </div>
            <div className="text-house-stream">
                <h1>{this.props.streamInfo.name}</h1>
                <p>12500 руб.</p>
                <p>{date}</p>
            </div>
        </div>
    </div>
    <hr className="hr-stream"/>
    </div>)
  }
}
