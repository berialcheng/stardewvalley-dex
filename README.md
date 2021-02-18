    // Taro.request({
    //   url: `https://zh.stardewcommunitywiki.com/mediawiki/api.php?page=${key}&action=parse&prop=text&format=json`,
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     let raw = res.data.parse.text['*'];
    //
    //     let content = parse(raw)
    //     content.querySelectorAll('.mw-editsection').forEach((n, i) => {
    //       n.remove();
    //     });
    //
    //     _this.setState({
    //       content: content.toString()
    //     })
    //   }
    // });
