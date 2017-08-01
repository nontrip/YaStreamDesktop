'use babel';

import React from 'react';
import MiddleAnswered from './middleAnswered.jsx'
import MiddleUnanswered from './middleUnanswered.jsx'

export default class Donat extends React.Component {
  render() {
    let MiddleField = this.props.Answered ? <MiddleAnswered text={this.props.donatInfo.text_data} id={this.props.donatInfo.operation_id}/> : <MiddleUnanswered text={this.props.donatInfo.text_data} id={this.props.donatInfo.operation_id}/>
    let hr = this.props.Answered ? <hr className="hr-uns" /> : <hr />
    return (
    <div>
        <div className="donat">
            <div className="donat-house">
                <div className="up">
                    <div className="img-house">
                        <img src="../images/social.png" width="25" height="31"/>
                    </div>
                    <p className="name">{this.props.donatInfo.sender}</p>
                    <div className="info">
                        <p className="sum">{this.props.donatInfo.amount/100} руб.</p>
                        <p className="date">{this.props.donatInfo.date.split('T')[0]}</p>
                    </div>
                </div>
                <div>
                    {MiddleField}
                </div>
            </div>
        </div>
        {hr}
        <div className="to-answer">
            
        </div>
    </div>)
  }
}
