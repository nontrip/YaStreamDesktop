'use babel';

import React from 'react';

export default class ButtonsPerDonat extends React.Component {
  render() {
    return (
        <div className="buttonsPerDonat">
            <ul>
                <li className="next">
                    <img src="../images/next.png" width="51" height="51"/>
                </li>
                <li className="done">
                    <img src="../images/done.png" width="57" height="57"/>
                </li>
                <li className="reply">
                    <img src="../images/write.png" width="51" height="51"/>
                </li>
            </ul>
    </div>)
  }
}