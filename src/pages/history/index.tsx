import React, { Component } from 'react'
import { View, Button, Text, CoverImage, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro';

import { AtList, AtListItem } from 'taro-ui'

import CardList from './CardList';


import './index.less';

type PageStateProps = {
    counter: {
        num: number
    }
}


type PageOwnProps = {
    tid: any
}

type PageState = {
    tankStatus: any;
    equList: any[];
    selectorChecked: string;
    id: String;
    endDate: string;
    beginDate: string;
    endTime: string;
    beginTime: string;
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
            id: "",
            endDate: "",
            beginDate: "",
            endTime:"",
            beginTime:""
        }

    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    async componentDidShow() {
        const reg = /=(.+?)&/;

        const { tid } = this.props;
        const id = reg.exec(tid)[1];

        console.log("result", id)

        this.setState({id});
        const res:any = await Taro.request({
            url: `http://140.143.24.32:8888/equipments?id=${id}`,
        });
        this.setState({ equList: res?.data || [] })

        console.log("鱼缸列表返回值", res)
    }

    refresh = async () => {

        const {id} = this.state;
        const res = await Taro.request({
            url: `http://140.143.24.32:8888/equipments?id=${id}`,
        });

        console.log("refresh的返回值", res)
    }

    handleSelect = (e) => {
        this.setState({
            selectorChecked: this.state.equList[e.detail.value]
        })
        console.log("被选择的index为：", e)
    }


    // 开始选择器
    onDateBeginChange = (e) => {
        console.log("onTimeChange", e)
        const beginDate = e.detail?.value;
        this.setState({
            beginDate
        })
    }

    onTimeBeginChange = (e) => {
        console.log("onTimeChange", e)
        const beginTime = e.detail?.value;
        this.setState({
            beginTime
        })
    }

    // 结束选择器
    onDateEndnChange = (e) => {
        console.log("onTimeChange", e)
        const endDate = e.detail?.value;
        this.setState({
            endDate
        })
    }

    onTimeEndChange = (e) => {
        console.log("onTimeChange", e)
        const endTime = e.detail?.value;
        this.setState({
            endTime
        })
    }

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

        const { tankStatus, selectorChecked, equList } = this.state
        return (
            <View className='index'>
                  <View style={{fontSize:"25px",color:" #069D97"}}>查询鱼缸历史记录页面：</View>

                <View className="selector">

                    <Picker mode='selector' range={this.state.equList} onChange={this.handleSelect}>
                        <AtList>
                            <AtListItem
                                title='需要查询的鱼缸为：'
                                extraText={equList[0] || selectorChecked || ""}
                            />
                        </AtList>
                    </Picker>

                </View>

                {/*开始时间选择区域*/}
                <View className='page-section'> 
                    <View className="selector">
                    <Text>开始时间：</Text>
                        <Picker mode='date' onChange={this.onDateBeginChange}>
                            <AtList>
                                <AtListItem title='日期' extraText={this.state.beginDate} />
                            </AtList>
                        </Picker>

                        <Picker mode='time' onChange={this.onTimeBeginChange}>
                            <AtList>
                                <AtListItem title='时间' extraText={this.state.beginTime} />
                            </AtList>
                        </Picker>
                    </View>
                </View>


                {/*结束时间选择区域*/}
                <View className='page-section'> 
                    <View className="selector">
                    <Text>结束时间：</Text>
                        <Picker mode='date' onChange={this.onDateEndnChange}>
                            <AtList>
                                <AtListItem title='日期' extraText={this.state.endDate} />
                            </AtList>
                        </Picker>

                        <Picker mode='time' onChange={this.onTimeEndChange}>
                            <AtList>
                                <AtListItem title='时间' extraText={this.state.endTime} />
                            </AtList>
                        </Picker>
                    </View>
                </View>


                <CardList columns={colums} dataSource={[]} />

            </View>
        )
    }
}

export default Index

