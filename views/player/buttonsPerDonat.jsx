'use babel';

import React from 'react';

export default class ButtonsPerDonat extends React.Component {
  render() {
    let cursorStyle = {cursor: 'default'}
    let ul
    if (this.props.active){
        ul = <ul>
                <li className="next">
                    <img src="../images/next.png" width="51" height="51"/>
                </li>
                <li className="done">
                    <img src="../images/done.png" width="57" height="57"/>
                </li>
                <li className={this.props.id+ " reply"}>
                    <img src="../images/write.png" width="51" height="51"/>
                </li>
            </ul>
    } else {
        ul = <ul>
                <li className="next">
                    <img src="../images/next.png" width="51" height="51"/>
                </li>
                <li className="done">
                    <img src="../images/doneYellow.png" width="57" height="57"/>
                </li>
                <li className={"replied reply "+this.props.id} style={cursorStyle}>
                    <img src="../images/write.png" width="51" height="51"/>
                </li>
            </ul>
    }
    return (
        <div className="buttonsPerDonat">
            {ul}
        </div>)
  }
}