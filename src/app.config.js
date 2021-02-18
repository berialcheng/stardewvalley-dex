export default {
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/tool/index',
    'pages/animal/index',
    'pages/npc/index',
  ],
  tabBar: {
    "color": "#B2B2B2",
    "selectedColor": "#353535",
    "backgroundColor": "#FFFFFF",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "./assets/tab-bar/house.png",
        "selectedIconPath": "./assets/tab-bar/house.png"
      },
      {
        "pagePath": "pages/tool/index",
        "text": "道具",
        "iconPath": "./assets/tab-bar/hoe.png",
        "selectedIconPath": "./assets/tab-bar/hoe.png"
      },
      {
        "pagePath": "pages/animal/index",
        "text": "动物",
        "iconPath": "./assets/tab-bar/white_chicken.png",
        "selectedIconPath": "./assets/tab-bar/brown_chicken.png"
      },
      {
        "pagePath": "pages/npc/index",
        "text": "NPC",
        "iconPath": "./assets/tab-bar/npc.png",
        "selectedIconPath": "./assets/tab-bar/npc.png"
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
