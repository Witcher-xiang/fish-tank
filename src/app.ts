import { Component } from 'react'
import './app.less'

import 'taro-ui/dist/style/index.scss' // taro的问题有点多目前这个taro-ui只能如此引入

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
