import React, { Component } from 'react'
import { View, Button, Text, CoverImage,Picker   } from '@tarojs/components'
import Taro from '@tarojs/taro';

import { AtList, AtListItem } from 'taro-ui'

import CardList from './CardList';

import Yes from '../../../assesst/Yes.png'
import No from '../../../assesst/No.png'
import './index.less';

type PageStateProps = {
    counter: {
        num: number
    }
}

type PageOwnProps = {
    tid:any;
}

type PageState = {
    tankStatus: any;
    equList: any[];
    selectorChecked: string;
    id: string;
    equipment: string;
}

type IProps = PageStateProps & PageOwnProps

interface Index {
    props: IProps;
    timer: any;
}

class Index extends Component<IProps, PageState> {
    constructor(porps) {
        super(porps);
        this.timer = null
        this.state = {
            tankStatus: false,
            equList: [],
            selectorChecked: "",
            id:"",
            equipment:"",
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    async componentDidShow() {
        const  reg = /=(.+?)&/;
        const { tid } = this.props;
        const id = reg.exec(tid)[1];

        this.setState({
            id
        })
        const res = await Taro.request({
            url:`http://140.143.24.32:8888/equipments?id=${id}`,
          });

          console.log("equipments",res)
          this.setState({
            equList:res?.data || []
          }, () => this.refresh(res?.data[0]))

          
    }

    refresh = async (value?:any) => {

        const { selectorChecked, id } = this.state
        const res = await Taro.request({
            url:`http://140.143.24.32:8888/data?equipment=${selectorChecked || value}&id=${id}`,
          });

          console.log("列表返回值为：:",res)
    }


    handleSelect =(e) => {
        const selectIndex = e.detail.value;

        console.log("被选择的值为：",selectIndex, this.state)
        this.setState({
            selectorChecked: this.state.equList[selectIndex]
          }, () => this.refresh()) 
    }

    handleManageFishTank = () =>{

        console.log("handleManageFishTank",this.state)
        const { id } = this.state;
        Taro.redirectTo({
            url: `/pages/mangageDevice/index?id=${id}`
        })
    }

    handleHistory = () => {
        const { id } = this.state;
        Taro.redirectTo({
            url: `/pages/history/index?id=${id}`
        })
    }

    handleDelete = (e) => {

    }

    render() {
        const colums = [
            {
                label: "含氧量",
                dataIndex: "o2",
                unit: "DO",
                target:"o2_target",
                isTarger: true,
            },
            {
                label: "二氧化碳含量",
                dataIndex: " o2",
                unit: "",
                target:"o2_target",
                isTarger: true,
            },
            {
                label: "温度",
                dataIndex: "temperature",
                unit: "℃",
                target:"temperature_target",
                isTarger: true,
            },
            {
                label: "盐度",
                dataIndex: "saltness",
                unit: "溶解度S",
                target:"tds_target",
                isTarger: true,
            },
            {
                label: "PH值",
                dataIndex: "ph",
                unit: "ph",
                target:"ph_target",
                isTarger: true,
            },
            {
                label: "照度",
                dataIndex: "勒克斯lux",
                unit: "illuminance",
                target:"illuminance_target",
                isTarger: true,
            },
            {
                label: "鱼食仓",
                dataIndex: "food",
                unit: "%"
            },
            {
                label: "酸剂仓",
                dataIndex: "%",
                unit: "acid"
            },
            {
                label: "碱剂仓",
                dataIndex: "alkali",
                unit: "%"
            },
            {
                label: "鱼粪仓",
                dataIndex: "manure",
                unit: "%"
            },
            {
                label: "鱼食投放间隔",
                dataIndex: "feeding_interval",
                unit: "秒",
                target:"feeding_interval_target",
                isTarger: true
            },
            {
                label: "每次鱼食投放量",
                dataIndex: "feeding_amoun",
                unit: "克",
                targetL:"feeding_amount_target",
                isTarger: true
            }     
        ]

        const { tankStatus } = this.state
        return (
            <View className='index'>

                {tankStatus ?
                    <View className="service-status">
                        <CoverImage className="image" src={Yes} />
                        <Text className="text">当前鱼缸链接状态正常!!!</Text>
                    </View>
                    :
                    <View className="service-status">
                        <CoverImage className="image" src={No} />
                        <Text className="text">当前无法连接到鱼缸</Text>
                    </View>
                }

                    <View>
                    <Button style={{marginTop:"20px"}}  onClick={this.handleManageFishTank}>管理鱼缸</Button>
                    <Button style={{marginTop:"20px"}}  onClick={this.handleHistory}>查看历史记录</Button>
                    <View>请选择你要查看的鱼缸</View>
                    <Picker mode='selector' range={this.state.equList} onChange={this.handleSelect}>
                <AtList>
                  <AtListItem
                    title='当前鱼缸为：'
                    extraText={ this.state.selectorChecked || this.state.equList[0] || ""}
                  />
                </AtList>
              </Picker>
                </View>

                <CardList equipment={this.state.selectorChecked || this.state.equList[0]} id={this.state.id} columns={colums} dataSource={[]} />

            </View>
        )
    }
}

export default Index

