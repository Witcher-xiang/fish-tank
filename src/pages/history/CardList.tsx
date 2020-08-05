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

                </View>

                <View className="body">
                    <Text>
                        {itemData}
                    </Text>
                </View>
            </View>
        </View>)
    }


    return (
        <View style={{ width: "100%" }}>
     
            {columns.map(item => {

                return (
                    card(item, dataSource)
                )
            })}
        </View>
    )
}

export default CardList;