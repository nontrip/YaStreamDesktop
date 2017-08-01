'use babel';

import React from 'react';

export default class Buttons extends React.Component {
  render() {
    return (
        <div className="buttons">
            <ul>
                <li>
                    <img src="../images/delete.png" width="28" height="28"/>
                </li>
                <li>
                    <img src="../images/done.png" width="28" height="28"/>
                </li>
                <li>
                    <img src="../images/write.png" width="28" height="28"/>
                </li>
            </ul>
    </div>)
  }
}