'use babel';

import React from 'react';
import HeaderAdd from './headerAdd.jsx'
import UpLayer from './upLayer.jsx'
import BottomLayer from './bottomLayer.jsx'

export default class MainMain extends React.Component {
  render() {
    return (
    <div>
       <HeaderAdd />
       <UpLayer />
       <BottomLayer />
    </div>)
  }
}