import React, { useState, useEffect } from 'react';
import { View, Button, Text, CoverImage, } from '@tarojs/components';

import './index.less';


interface CardProps {
    columns: any[]
    dataSource: any[];
}

const CardList = (props: CardProps) => {

    const { columns, dataSource } = props;

    const [visible, setVisible] = useState(false);
    const [modalValue, setModalValue] = useState({});


    const card = (columnItem = {}, dataList = []) => {

        const handleEdit = (value) => {
            setVisible(true);
            setModalValue(value);
            console.log("valuevaluevalue:", value);
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
                    itemData["data"] = dataList[key]
                }
                if (columnItem?.target == key) {
                    itemData["target"] = dataList[key]
                }
            })

        return (<View className="data-list" key={columnItem?.label}>
            <View className="card">
                <View className="title">
                    {columnItem?.label}:

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