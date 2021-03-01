import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import {AtNavBar, AtButton} from 'taro-ui'
import {View, Text, Image, Slot} from '@tarojs/components'
import {tagStyle} from "../mpHtml";
import {fetchData} from "../database";
import './index.scss'

import "../../../node_modules/taro-ui/dist/style/components/flex.scss";
import "../../../node_modules/taro-ui/dist/style/components/nav-bar.scss";
import "../../../node_modules/taro-ui/dist/style/components/button.scss";
import "../../../node_modules/taro-ui/dist/style/components/icon.scss";


export default class RichViewer extends Component {

  constructor(props) {
    super(props);
    this.toAppend = [];
    this.state = {
      key: null,
      loading: true,
      hasError: false,
      content: ''
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (getCurrentInstance().router.params.name) {
      this.changeContent(getCurrentInstance().router.params.name)
    } else {
      this.changeContent(this.props.start)
    }
  }

  componentWillUnmount() {
  }

  onShareAppMessage(e) {
    console.log('onShareAppMessage', e);
  }

  onHandleNavIconClick(e) {
    console.log(e);
    Taro.navigateBack({delta: 1});
  }

  onHandleClickRgIconSt(e) {
    console.log(e);
    Taro.switchTab({url: '/pages/index/index'});
  }


  onHandleNavIconClick(e) {
    console.log(e);
    Taro.navigateBack({
      delta: 1
    });
  }

  onClickRetry(e) {
    console.log('onClickRetry', e);
    this.changeContent(this.state.key);
  }

  onMpHtmlLoad(e) {
    console.log('onLoad', e);
    let page = getCurrentInstance();
    this.mpHtml = page.page.selectComponent('#article');

    let appendContent = this.toAppend.shift();
    if (appendContent) {
      console.log(`toAppend ${appendContent.length} remain ${this.toAppend.length} `)
      this.mpHtml.setContent(appendContent, true)
    }
  }

  onMpHtmlReady(e) {
    console.log('onReady', e);
  }

  onMpHtmlError(e) {
    console.log('onError', e);
    this.setState({
      hasError: true
    })
  }

  onMpHtmlImgTap(e) {
    console.log('onImgTap', e);
  }

  onMpHtmlLinkTap(e) {
    console.log('onLinkTap', e);
    if (e.detail && e.detail.title) {
      if (e.detail.href) {
        let match = e.detail.href.match(/\/(.*)$/);
        if (match) {
          Taro.navigateTo({
            url: `/pages/detail/index?name=${decodeURIComponent(match[1])}`
          });
        } else {
          Taro.navigateTo({
            url: `/pages/detail/index?name=${e.detail.title}`
          })
        }
      } else {
        Taro.navigateTo({
          url: `/pages/detail/index?name=${e.detail.title}`
        })
      }
      //this.changeContent(e.detail.title)
    } else if (e.detail && e.detail.href && e.detail.href.indexOf('#') === 0) {
      console.log('点击锚点', e.detail.href);
      this.mpHtml.navigateTo(e.detail.href).then(() => {
        console.log('跳转成功')
      }).catch(err => {
        console.log('跳转失败：', err)
      })
    }
  }

  async changeContent(key) {
    let _this = this;
    _this.setState({
      loading: true
    });
    Taro.showLoading({
      title: '加载中',
    });
    try {
      let resp = await fetchData(key);

      console.log("Char size", resp.length);
      let c = resp;

      if (resp.length > 200000) {
        // 为了解决vdSyncData 过大的问题，切分渲染的数据到toAppend中，做阶段性渲染
        let span = 200000;

        let pos = resp.substring(0, span).lastIndexOf(">") + 1;
        let pre = pos;
        c = resp.substring(0, pos);
        console.log('slide', 0, pos, pos - 0);
        let remain = resp.length - pos;
        while (remain > 0) {
          if (remain >= span) {
            pos = resp.substring(0, pre + span).lastIndexOf(">") + 1;
            console.log('slide', pre, pos, pos - pre, remain);
            this.toAppend.push(resp.substring(pre, pos));
            remain = remain - (pos - pre);
            pre = pos;
          } else {
            console.log('slide', pre, resp.length, resp.length - pre, 0);
            this.toAppend.push(resp.substring(pre, resp.length));
            remain = 0;
          }
        }
      }

      _this.setState({
        key: key,
        content: c,
        loading: false,
        hasError: false
      })
    } catch (e) {
      console.error(e);
      _this.setState({
        key: key,
        loading: false,
        hasError: true
      })
    } finally {
      Taro.hideLoading();
    }

  }

  render() {
    return (
      <View style='font-size: 16px; padding-left:3px; padding-right:3px;'>

        {
          this.props.displayNav &&
          <View className='detail-top'>
            <AtNavBar
              onClickLeftIcon={this.onHandleNavIconClick.bind(this)}
              onClickRgIconSt={this.onHandleClickRgIconSt.bind(this)}
              color='#000'
              title={this.state.key}
              leftText='返回'
              leftIconType='chevron-left'
              rightFirstIconType='home'
              // rightSecondIconType='user'
            />
          </View>
        }

        {
          this.props.displayNav &&
          <View className='detail-container-placeholder'></View>
        }

        {
          this.state.loading &&
          <View style={'font-size: 18px; text-align: center; margin-top: 50px;'}>
            努力加载中...
          </View>
        }

        {
          !this.state.loading &&
          this.state.hasError &&
          <View style={'font-size: 18px; text-align: center; margin-top: 50px;'}>
            抱歉, 出错了, 请重试或返回
            <View style={'margin-top: 10px;'}>
              <AtButton type='primary' size='small' onClick={this.onClickRetry.bind(this)}>重试</AtButton>
            </View>
            <View style={'margin-top: 10px;'}>
              <AtButton type='secondary' size='small' onClick={this.onHandleNavIconClick.bind(this)}>返回</AtButton>
            </View>
          </View>
        }

        {
          !this.state.loading &&
          !this.state.hasError &&
          <mp-html content={this.state.content}
                   tagStyle={tagStyle(this.state.key)}
                   useAnchor={true}
                   copyLink={false}
                   previewImg={false}
                   lazyLoad={true}
                   onLoad={this.onMpHtmlLoad.bind(this)}
                   onReady={this.onMpHtmlReady.bind(this)}
                   onError={this.onMpHtmlError.bind(this)}
                   onImgTap={this.onMpHtmlImgTap.bind(this)}
                   onLinktap={this.onMpHtmlLinkTap.bind(this)}
                   id={'article'}
            // ref={'article'}
          >
            加载中...
          </mp-html>
        }

        <View style={'padding-top: 8px;'}>
          {
            typeof qq !== 'undefined' &&
            this.props.displayNav &&
            <ad unit-id='5c02daf9a3142ee80f50cea155e19387'></ad>
          }

          {
            typeof qq !== 'undefined' &&
            !this.props.displayNav &&
            <ad unit-id="9ca7ebb19cd2b9af5f2660093b855352" type="card"></ad>
          }
        </View>
      </View>
    )
  }
}
