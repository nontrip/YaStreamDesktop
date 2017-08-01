'use babel';

import React from 'react'
import TitleBar from '../common/titleBar.jsx'
import ChooseBtn from './chooseBtn.jsx'

export default class ChooseAuthMain extends React.Component {
  render() {
    return (
        <div>
            <TitleBar windowName="Яндекс.Стрим"/>
            <ChooseBtn />
        </div>
    )
  }
}

