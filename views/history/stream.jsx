'use babel';

import React from 'react';

export default class Stream extends React.Component {
  render() {
    return (
        <div>
    <div className="stream">
        <div className="stream-house">
            <div className="img-house-stream">
                <img src="../images/streamPreview.png" width="107" height="67"/>
            </div>
            <div className="text-house-stream">
                <h1>Добиваем колду и спать</h1>
                <p>12500 руб.</p>
                <p>24.03.2017</p>
            </div>
        </div>
    </div>
     <hr className="hr-stream"/>
    </div>)
  }
}
