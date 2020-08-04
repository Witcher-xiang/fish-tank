import React, { Component } from 'react'
import Taro from '@tarojs/taro';

import  { View, Button, Input, Form, Text } from '@tarojs/components'


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


type PageOwnProps = {
  tid: string;
}

type PageState = {
  message:String;
  id: String;
  equipments: any[]
}

type IProps =  PageOwnProps

interface Index {
  props: IProps;
  formReset:React.ReactDOM;

}

class Index extends Component<IProps,PageState> {
  constructor(props){
    super(props)
    this.state={
      message:"",
      id:"",
      equipments: []
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  async componentDidShow() {
    const  reg = /=(.+?)&/;
    
    const { tid } = this.props;
    const id = reg.exec(tid)[1];

    console.log("result",id)

    this.setState({
        id
    },() => this.refresh())
   
}

  componentDidHide() { }



  refresh =async () => {

    const { id } =this.state;
    const res = await Taro.request({
      url:`http://140.143.24.32:8888/equipments?id=${id}`,
    });

    this.setState({
      equipments:res?.data || []
    })
  }

  formSubmit =async (e) => {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    const {equipment} = e.detail.value;
    const { id } = this.state;

    try{
      const res = await Taro.request({
        url:`http://140.143.24.32:8888/add?id=${id}&equipment=${equipment}`,
      });
      console.log("添加设备的res为",res);
     // 跳转到目的页面，在当前页面打开
     this.refresh()
    } catch(err){
      console.log(err)
    }
  }

  handleDelete = async (equipment) => {

    console.log("equipment",equipment)
    const { id } = this.state;
    const res = await Taro.request({
      url:`http://140.143.24.32:8888/del?equipment=${equipment}&id=${id}`,
    });
    console.log(res)

    this.refresh();
  }
  


  render() {
    const { equipments } = this.state;
    return (
      <View className='index'>

      <Form onSubmit={this.formSubmit}>
       
       <View className="input_label">添加设备:</View>
          <View className="input_comp">
              <Input className=""  name="equipment"  type="text" placeholder="请输入设备号" />
          </View>
            

          <View className="btn-area">
        <Button className="submit_btn" type="primary" formType="submit">添加</Button>

      </View>
          </Form>


        { equipments.map( item => {

          return (
          <View className="list" key={item}>
          <Text>设备号：{item} </Text>
          <Text onClick={() => this.handleDelete(item)} style={{marginLeft:"20px",color:"#069D97"}}>删除</Text>
          </View>
          )
        })}
        
      </View>
    )
  }
}

export default Index

