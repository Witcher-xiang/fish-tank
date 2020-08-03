import React, { useState, useEffect } from 'react';
import { View, Button, Text, CoverImage, } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput  } from "taro-ui";

import './index.less';


interface CardProps {
    columns: any[]
    dataSource: any[];
}

const CardList = (props: CardProps) => {

    const { columns, dataSource } = props;

    const [visible ,setVisible] = useState(false);
    const [modalValue, setModalValue] = useState({});
    const [submitValue, setSubmitValue] = useState("");

    const card = (columnItem = {}, dataList = []) => {

        const handleEdit = (value) => {
            setVisible(true);
            setModalValue(value);
            console.log("valuevaluevalue:",value);
        }

        let itemData = "";

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
                    itemData = dataList[key]
                }
            })

        return (<View className="data-list" key={columnItem?.label}>
            <View className="card">
                <View className="title">
                    {columnItem?.label}:

                {columnItem?.isTarger ? <Text onClick={() => handleEdit(columnItem)} style={{ color: "#6190E8", marginRight: "20px" }}>修改</Text> : ""}
                </View>

                <View className="body">
                    <Text>
                        {itemData}
                    </Text>
                </View>
            </View>
        </View>)
    }

    const handleVisible = () => {
        setVisible(true);
    }

    const Modal = () => {
        if(!visible) return null;

        const onOk = () => {
            onCancel()
            console.log("modalValue",modalValue)
            
        }

        const onCancel = () => {
            setVisible(false);
            setSubmitValue("");
        }

        const handleChange = (value) =>{
            console.log(value);
            setSubmitValue(value)
        }

        return (
            <AtModal isOpened>
                <AtModalHeader>标题</AtModalHeader>
                <AtModalContent>
                {/* <AtForm
                    onSubmit={this.onSubmit.bind(this)}
                    onReset={this.onReset.bind(this)}
                >
                    <AtInput 
                    name='value' 
                    title='文本' 
                    type='text' 
                    placeholder='单行文本' 
                    value={this.state.value} 
                    onChange={this.handleChange.bind(this, 'value')} 
                    />
                    <AtButton formType='submit'>提交</AtButton>
                    <AtButton formType='reset'>重置</AtButton>
                </AtForm> */}
                    <AtInput name="value" placeholder='输入修改值' value={submitValue}    title={modalValue?.label} onChange={handleChange}/>
                </AtModalContent>
                <AtModalAction> <Button onClick={onCancel}>取消</Button> <Button onClick={onOk}>确定</Button> </AtModalAction>
            </AtModal>
        )
    }

    return (
        <View style={{ width: "100%" }}>
            <Modal/>
            {columns.map(item => {

                return (
                    card(item, dataSource)
                )
            })}
        </View>
    )
}

export default CardList;