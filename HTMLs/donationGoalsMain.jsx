'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import GoalsMenu from './goalsMenu.jsx'
import NoGoals from './noGoals.jsx'

export default class DonationGoalsMain extends React.Component {
  render() {
    return (
        <div className="donationGoals">
            <TitleBar windowName="Новый стрим" />
            <h1 className="header">Цели по сборам: </h1>
            <GoalsMenu />
        </div>
    )
  }
}
