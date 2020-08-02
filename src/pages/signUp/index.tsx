import React, { Component } from 'react'
import Taro from '@tarojs/taro';

import  { View, Button, Input, Form } from '@tarojs/components'


import './index.less'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}


class Index extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { 
    alert("好的，没问题")
  }

  componentDidHide() { }

  formSubmit =async (e) => {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    try{
      // const res = await Taro.request({
      //   url:"http://140.143.24.32:666",
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      // });
      // console.log("登录的res为",res);
     // 跳转到目的页面，在当前页面打开
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    } catch(err){
      console.log(err)
    }
  }

  formReset = () => {
    console.log("清掉了空了")
  }
  
  handleSignUp = () => {
    
  }

  render() {
    return (
      <View className='index'>
        
        <Form onSubmit={this.formSubmit} onReset={this.formReset}>
       
       <View className="input_label">注册账号:</View>
          <View className="input_comp">
              <Input className=""  name="userName"  type="text" placeholder="请输入您要注册的账号" />
          </View>
            
          <View className="input_label">注册密码:</View>
          <View className="input_comp">
              <Input className="" name="password" password type="text" placeholder="请输入您要注册的密码" />
          </View>

          <View className="btn-area">
        <Button className="submit_btn" type="primary" formType="submit">注册</Button>
        <Button   formType="reset">重置</Button>

      </View>

          </Form>
      </View>
    )
  }
}

export default Index

