'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import GoalsMenu from './goalsMenu.jsx'
import NoGoals from './noGoals.jsx'

export default class DonationGoalsMain extends React.Component {
  render() {
    let main = this.props.goals ? <GoalsMenu goals={this.props.goals} /> : <NoGoals />
    return (
        <div className="donationGoals">
            <TitleBar windowName="ЯСтрим" />
            {main}
        </div>
    )
  }
}
