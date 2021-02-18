import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import { AtNavBar } from 'taro-ui'
import {View, Text, Image} from '@tarojs/components'
import {tagStyle} from "../../component/mpHtml";
import {fetchData} from "../../component/database";
import './index.scss'

import "../../../node_modules/taro-ui/dist/style/components/flex.scss";
import "../../../node_modules/taro-ui/dist/style/components/nav-bar.scss";
import "../../../node_modules/taro-ui/dist/style/components/icon.scss";


export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: null,
      content: ''
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (getCurrentInstance().router.params.name) {
      this.changeContent(getCurrentInstance().router.params.name)
    } else {
      this.changeContent('Template:Mainmenu')
    }
  }

  componentWillUnmount() {
  }

  onShareAppMessage() {
  }

  onHandleNavIconClick(e) {
    Taro.navigateBack({
      delta: 1
    });
  }

  onLinkTap(e) {
    console.log(e)
    if (e.detail && e.detail.title) {
      //this.changeContent(e.detail.title)
      Taro.navigateTo({
        url: `/pages/detail/index?name=${e.detail.title}`
      })
    } else {
      // ctx.navigateTo('anchor').then(() => {
      //   console.log('跳转成功')
      // }).catch(err => {
      //   console.log('跳转失败：', err)
      // })
    }
  }

  async changeContent(key) {
    let _this = this
    Taro.showLoading({
      title: '加载中',
    });
    let resp = await fetchData(key);
    Taro.hideLoading();
    _this.setState({
      key: key,
      content: resp
    })
  }

  render() {
    return (
      <View style='font-size: 16px; padding-left:3px;padding-right:3px;'>
        <mp-html content={this.state.content} tagStyle={tagStyle(this.state.key)} useAnchor
          copyLink={false}
          previewImg={false}
          onLinktap={this.onLinkTap.bind(this)}
        >
          加载中...
        </mp-html>

        <View style={'padding-top: 8px;'}>
          <ad unit-id="9ca7ebb19cd2b9af5f2660093b855352" type="card"></ad>
        </View>
      </View>
    )
  }
}
