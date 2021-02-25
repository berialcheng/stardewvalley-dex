import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import {AtNavBar} from 'taro-ui'
import {View, Text, Image} from '@tarojs/components'
import {tagStyle} from "../../component/mpHtml";
import {fetchData} from "../../component/database";
import './index.scss'

import "../../../node_modules/taro-ui/dist/style/components/flex.scss";
import "../../../node_modules/taro-ui/dist/style/components/nav-bar.scss";
import "../../../node_modules/taro-ui/dist/style/components/icon.scss";
import RichViewer from "../../component/RichViewer";


export default class Index extends RichViewer {

  constructor(props) {
    super(props);
    this.props.displayNav = true;
  }
}
