import React, {Component} from 'react'
import Taro, {getCurrentInstance } from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {tagStyle} from "../../component/mpHtml";
import {fetchData} from "../../component/database";
import './index.scss'
import RichViewer from "../../component/RichViewer";

export default class Index extends RichViewer {
  constructor(props) {
    super(props);
    this.props.start = '村民';
  }
}
