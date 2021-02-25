export default {
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/tool/index',
    'pages/ginger/index',
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
        "pagePath": "pages/npc/index",
        "text": "NPC",
        "iconPath": "./assets/tab-bar/npc.png",
        "selectedIconPath": "./assets/tab-bar/npc.png"
      },
      {
        "pagePath": "pages/ginger/index",
        "text": "姜岛",
        "iconPath": "./assets/tab-bar/Golden_Walnut.png",
        "selectedIconPath": "./assets/tab-bar/Golden_Walnut.png"
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
