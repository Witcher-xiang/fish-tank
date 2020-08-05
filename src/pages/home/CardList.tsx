import React, { useState, useEffect } from 'react';
import { View, Button, Text, CoverImage, } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput  } from "taro-ui";
import Taro from '@tarojs/taro';
import './index.less';


interface CardProps {
    columns: any[]
    dataSource: any[];
    id?:string;
    equipment?: string;
}

interface columnItem {
    label:string,
    dataIndex?:any,
    isTarger?: any
    target?: any;
}

const CardList = (props: CardProps) => {

    const { columns, dataSource } = props;

    const [visible ,setVisible] = useState(false);
    const [modalValue, setModalValue] = useState<any>("");
    const [submitValue, setSubmitValue] = useState("");
    const [message, setMessage] = useState("");

    const card = (columnItem:columnItem = {label:""}, dataList = []) => {

        const handleEdit = (value) => {
            setVisible(true);
            setModalValue(value);
            console.log("valuevaluevalue:",value);
        }

        let itemData = {};

        Array.isArray(dataList) ?

            dataList.forEach(item => {
                Object.keys(item).forEach(key => {
                    if (columnItem?.dataIndex === key) {
                        itemData = item[key]
                    }
                })

            })
            :
            Object.keys(dataList).forEach(key => {
                if (columnItem?.dataIndex == key) {
                    itemData["data"] = dataList[key]
                }
                if (columnItem?.target == key) {
                    itemData["target"]= dataList[key]
                }
            })

        return (<View className="data-list" key={columnItem?.label}>
            <View className="card">
                <View className="title">
                    {columnItem?.label}:

                {columnItem?.isTarger ? <Text onClick={() => handleEdit(columnItem)} style={{ color: "#6190E8", marginRight: "20px" }}>修改</Text> : ""}
                </View>
                
                <View className="body">
                    <View>
                        当前数值：{itemData?.data}{`    ${columnItem?.unit}`}
                    </View>
                    {itemData?.target && <View>
                        目标数值：{itemData?.target}{`    ${columnItem?.unit}`}
                    </View>}
                </View>
            </View>
        </View>)
    }

    const handleVisible = () => {
        setVisible(true);
    }

    const Modal = () => {
        if(!visible) return null;

        const onOk = async () => {
            const { id, equipment } = props;
            onCancel()
            console.log("modalValue",modalValue,submitValue)
            setSubmitValue("")

            const { target } = modalValue;

            console.log("target",target)
            const res = await Taro.request({
                url:`http://140.143.24.32:8888/control?id=${id}&equipment=${equipment}&${target}=${submitValue}`,
              });

              console.log(res.data)
              setMessage(res.data?.status ? "修改成功" : "修改失败，设备可能离线")
            
        }

        const onCancel = () => {
            setVisible(false);
            setSubmitValue("");
        }

        const handleChange = (value) =>{
            console.log("修改的值为：",value);
            setSubmitValue(value)
        }

        return (
            <AtModal isOpened>
                <AtModalHeader>修改目标值</AtModalHeader>
                <AtModalContent>
                    <AtInput name="value" placeholder='输入修改值' value={submitValue}    title={modalValue?.label} onChange={handleChange}/>
                </AtModalContent>
                <AtModalAction> <Button onClick={onCancel}>取消</Button> <Button onClick={onOk}>确定</Button> </AtModalAction>
            </AtModal>
        )
    }

    return (
        <View style={{ width: "100%" }}>
        <View>{message}</View>
        <View style={{ width: "100%" }}>  
            <Modal/>
            {columns.map(item => {

                return (
                    card(item, dataSource)
                )
            })}
        </View>
        </View>
    )
}

export default CardList;