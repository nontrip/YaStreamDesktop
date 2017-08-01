'use babel';

import React from 'react';
import Buttons from './buttons.jsx'
import MiddleText from './middleText.jsx'
import MiddleAudio from './middleAudio.jsx'

export default class Donat extends React.Component {
  render() {
      let middle = this.props.middle == 'text' ? <MiddleText text={this.props.donatInfo.text_data}/> : <MiddleAudio />
    return (
        <div>
            <div className="donat">
                <div className="donat-house">
                    <div className="up-layer">
                        <div className="img-house">
                            <img src="../images/social.png" width="26" height="31"/>
                        </div>
                        <div className="text-house">
                            <p>{this.props.donatInfo.sender}</p>
                            <p>{this.props.donatInfo.amount/100} руб.</p>
                        </div>
                    </div>
                    {middle}
                    <Buttons />
                </div>
            </div>
            <hr />
    </div>)
  }
}