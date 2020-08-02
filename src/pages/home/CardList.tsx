import React from 'react'
import { View, Button, Text, CoverImage, } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"



import './index.less'


interface CardProps {
    columns: any[]
    dataSource: any[];
}

const CardList = (props: CardProps) => {

    const { columns, dataSource } = props

    const card = (columnItem = {}, dataList = []) => {

        const handleEdit = (value) => {

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

                {columnItem?.isTarger ? <Text onClick={(columnItem) => handleEdit(columnItem)} style={{ color: "#6190E8", marginRight: "20px" }}>修改</Text> : ""}
                </View>

                <View className="body">
                    <Text>
                        {itemData}
                    </Text>
                </View>
            </View>
        </View>)
    }

    const Modal = () => {

        return (
            <AtModal isOpened>
                <AtModalHeader>标题</AtModalHeader>
                <AtModalContent>
                    这里是正文内容，欢迎加入京东凹凸实验室
                    这里是正文内容，欢迎加入京东凹凸实验室
                    这里是正文内容，欢迎加入京东凹凸实验室
                </AtModalContent>
                <AtModalAction> <Button>取消</Button> <Button>确定</Button> </AtModalAction>
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