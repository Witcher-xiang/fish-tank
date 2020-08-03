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
  constructor(props){
    super(props);
    this.state={
      message:""
    }
  };

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
    const { userName, password } = e.detail.value;
    try{
      const res:any = await Taro.request({
        url:`http://140.143.24.32:8888/register?id=${userName}&password=${password}`,
      });
     // 跳转到目的页面，在当前页面打开
      console.log("返回的注册信息",res)

      if(res?.data?.status === true){
      Taro.redirectTo({
        url: '/pages/index/index'
      })
      this.setState({message:"注册成功"})
    }else this.setState({message:"注册失败(可能有重复添加)"});

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
          <View>{this.state.message}</View>
      </View>
    )
  }
}

export default Index

