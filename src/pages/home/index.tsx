import React, { Component } from 'react'
import { View, Button, Text, CoverImage, } from '@tarojs/components'


import CardList from './CardList';

import Yes from '../../../assesst/Yes.png'
import No from '../../../assesst/No.png'
import './index.less';

type PageStateProps = {
    counter: {
        num: number
    }
}


type PageOwnProps = {}

type PageState = {
    tankStatus: any;
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
            tankStatus: false
        }

    }
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    componentDidShow() {
        this.timer = setInterval(() => {

        }, 30000)
        console.log("什么是Did show")
    }

    componentDidHide() { }

    render() {
        const colums = [
            {
                label: "含氧量",
                dataIndex: "o2",
                unit: "DO"
            },
            {
                label: "二氧化碳含量",
                dataIndex: " o2",
                unit: ""
            },
            {
                label: "温度",
                dataIndex: "temperature",
                unit: "℃"
            },
            {
                label: "盐度",
                dataIndex: "saltness",
                unit: "溶解度S"
            },
            {
                label: "PH值",
                dataIndex: "ph",
                unit: "ph"
            },
            {
                label: "照度",
                dataIndex: "勒克斯lux",
                unit: "illuminance"
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
                unit: "秒"
            },
            {
                label: "每次鱼食投放量",
                dataIndex: "feeding_amoun",
                unit: "克"
            },
            // TODO这是啥玩意
            {
                label: "预设",
                dataIndex: "preset",
                unit: "鱼的名字"
            },

            //TODO 这个target离谱！
            {
                label: "含氧量目标值",
                dataIndex: "DO",
                unit: "o2_target",
                isTarger: true,
            },
            {
                label: "二氧化碳目标值",
                dataIndex: "co2_target",
                unit: "",
                isTarger: true,
            },
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

                <CardList columns={colums} dataSource={[]} />

            </View>
        )
    }
}

export default Index

