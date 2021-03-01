import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtSearchBar, AtButton, AtListItem, AtList, AtCard, AtLoadMore} from 'taro-ui'
import {queryData} from '../../components/database';

import "../../../node_modules/taro-ui/dist/style/components/search-bar.scss";
import "../../../node_modules/taro-ui/dist/style/components/list.scss" // 按需引入
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchContent: '',
      searchResult: [],
      searching: false,
    }
  }

  onSearchChange(value) {
    this.setState({
      searchContent: value
    })
  }

  onItemClick(e) {
    Taro.navigateTo({
      url: `/pages/detail/index?name=${e.title}`
    });
  }

  async onSearchClick() {
    let _this = this;
    console.log('onSearchClick', this.state.searchContent)
    _this.setState({
      loading: true
    });
    Taro.showLoading({
      title: '加载中',
    });

    try {
      let result = (await queryData(this.state.searchContent)).query.search;
      this.setState({
        searching: true,
        searchResult: result
      })
    } catch (e) {

    } finally {
      Taro.hideLoading();
    }
  }

  render() {
    return (
      <View>
        <AtSearchBar
          value={this.state.searchContent}
          onChange={this.onSearchChange.bind(this)}
          onActionClick={this.onSearchClick.bind(this)}
        />

        {
          !this.state.searching && this.state.searchResult.length == 0 &&
          <View>
            请输入搜索内容
          </View>
        }

        {
          this.state.searching && this.state.searchResult.length == 0 &&
          <View>
            搜结果为0，请重新编辑关键字搜索
          </View>
        }

        {
          this.state.searchResult && this.state.searchResult.length > 0 &&
          <AtList>
            {
              this.state.searchResult.map((r, n) => {
                return <AtListItem title={r.title} arrow='right' onClick={this.onItemClick.bind(this, r)}></AtListItem>
              })
            }
          </AtList>
        }

      </View>
    )
  }
}
