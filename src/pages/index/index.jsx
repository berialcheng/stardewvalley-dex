import React from 'react'
import RichViewer from '@components/RichViewer'
import './index.scss'

export default class Index extends RichViewer {
  constructor(props) {
    super(props);
    this.props.start = 'Template:Mainmenu';
  }
}
