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

    equList: any[];
    historyList:any[];
    historyListLenght:Number;
    currHistory: number;
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
            equList: [],
            historyList: [],
            historyListLenght:0,
            currHistory:0,
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

    refresh =async  () => {

        const {id, selectorChecked, beginDate, beginTime , endDate, endTime, equList} = this.state;
        const startTime = `${beginDate}${beginTime || "00:00"}`
        const endTimeValue = `${endDate}${endTime || "00:00"}`

        console.log(startTime, endTime)
        const res = await Taro.request({
            url: `http://140.143.24.32:8888/history?id=${id}&equipment=${selectorChecked || equList[0]}&endTime=${endTimeValue}&startTime=${startTime}`,
        });

        console.log("refresh的返回值", res)
        this.setState({
            historyListLenght: res.data.length,
            historyList: res.data,
        })
    }

    handleSelect = (e) => {
        this.setState({
            currHistory: e.detail?.value 
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

    creactList = (length) => {
        console.log("asdfdsf",length)
        let arr = []
        for(let i =0; i<length; i++){
            arr.push(`${i}`)
        }

        console.log("arr",arr)
        return arr;
    }

    // 表Index数展示
    onPageSelect = (e) => {
        console.log("currHistory", e.detail?.value)
        const currHistory = e.detail?.value;
        this.setState({
            currHistory
        })
    
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
                dataIndex: "co2",
                unit: "",
                target:"co2_target",
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
                unit: "S(溶解度)",
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
                dataIndex: "illuminance",
                unit: "lux",
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
                dataIndex: "acid",
                unit: "%"
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
                dataIndex: "feeding_amount",
                unit: "克",
                target:"feeding_amount_target",
                isTarger: true
            },     
            {
                label: "LED灯光显示",
                dataIndex: "led_mode",
                unit: " （输入值含义：0代表色彩渐变循环、1代表白色呼吸、2代表指定色彩）",
                target:"led_mode",
                isTarger: true
            },
            {
                label: "LED灯红色",
                dataIndex: "led_r",
                unit: " （红色亮度值，0-255）",
                target:"led_r",
                isTarger: true
            },
            {
                label: "LED灯蓝色",
                dataIndex: "led_b",
                unit: " （蓝色亮度值，0-255）",
                target:"led_b",
                isTarger: true
            } ,
            {
                label: "LED灯绿色",
                dataIndex: "led_g",
                unit: " （绿色亮度值，0-255）",
                target:"led_g",
                isTarger: true
            } ,
            {
                label: "LED灯白色",
                dataIndex: "led_w",
                unit: " （白色亮度值，0-255）",
                target:"led_w",
                isTarger: true
            } 
        ]

        const {  selectorChecked, equList, historyListLenght,historyList, currHistory } = this.state
        return (
            <View className='index'>
                  <View style={{fontSize:"25px",color:" #069D97"}}>查询鱼缸历史记录页面：</View>

                <View className="selector">
                    <Picker mode='selector' range={this.state.equList} onChange={this.handleSelect}>
                        <AtList>
                            <AtListItem
                                title='需要查询的鱼缸为：'
                                extraText={ selectorChecked || equList[0]  || ""}
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

                {console.log("historyListLenght",historyListLenght)}
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
                {console.log("currHistory",currHistory)}
                <View className="selector">
                    <Picker mode='selector' range={this.creactList(historyListLenght )} onChange={this.handleSelect}>
                        <AtList>
                            <AtListItem
                                title='需要查询的页数'
                                extraText={currHistory + "" || ""}
                                disabled = { historyListLenght > 0 ? false : true}
                            />
                        </AtList>
                    </Picker>
                </View>

                <Button onClick={this.refresh}>搜索</Button>

                <CardList columns={colums} dataSource={historyList[currHistory]} />

            </View>
        )
    }
}

export default Index

