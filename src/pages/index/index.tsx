import React, { Component } from 'react'
import Taro from '@tarojs/taro';

import  { View, Button, Input, Form } from '@tarojs/components'


import './index.less'

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

type PageOwnProps = {
  
}

type PageState = 
{
  message:string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}



class Index extends Component<IProps,PageState> {
  constructor(props){
    super(props)
    this.state={
      message:""
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidHide() { }

  formSubmit =async (e) => {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    const {userName, password} = e.detail.value
    try{
      const res = await Taro.request({
        url:`http://140.143.24.32:8888/login?id=${userName}&password=${password}`,
      });
      console.log("登录的res为",res);
     // 跳转到目的页面，在当前页面打开
     if(res?.data?.status === true){
      Taro.navigateTo({
        url: `/pages/home/index?id=${userName}`
      })
      this.setState({ message:"登录成功！" })
    }else this.setState({ message:"登录失败，taro这个ui就是lj" })

    } catch(err){
      console.log(err)
    }
  }

  formReset = () => {
  }
  
  handleSignUp = () => {
    Taro.navigateTo({
      url: '/pages/signUp/index'
    })
  }

  render() {
    return (
      <View className='index'>
        
        <Form onSubmit={this.formSubmit} onReset={this.formReset}>
       
       <View className="input_label">账号:</View>
          <View className="input_comp">
              <Input className=""  name="userName"  type="text" placeholder="请输入您的账号" />
          </View>
            
          <View className="input_label">密码:</View>
          <View className="input_comp">
              <Input className="" name="password" password type="text" placeholder="请输入您的密码" />
          </View>

          <View className="btn-area">
        <Button className="submit_btn" type="primary" formType="submit">登录</Button>
        <Button  formType="reset">重置</Button>
        <Button style={{marginTop:"20px"}}  onClick={this.handleSignUp}>注册</Button>
      </View>
          </Form>

          <View>{this.state.message}</View>
      </View>
    )
  }
}

export default Index

