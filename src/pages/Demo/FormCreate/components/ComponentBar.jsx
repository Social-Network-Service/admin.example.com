import {useContext} from "react";
import {Tag} from 'antd'
import {
    inputComponents, selectComponents, layoutComponents, formConf
} from './config'
import {GlobalDataContext} from "../contexts/GlobalDataContext";
import {SvgIcon} from "@/components";

export default () => {
    const {addFormItem} = useContext(GlobalDataContext)
    const leftComponents = [
        {
            title: '输入型组件',
            list: inputComponents
        },
        {
            title: '选择型组件',
            list: selectComponents
        },
        {
            title: '布局型组件',
            list: layoutComponents
        }
    ]

    return (
        <div className="component-bar">
            <SvgIcon name={'404'}></SvgIcon>
            <SvgIcon name={'baidu'}></SvgIcon>
            <div className="component-group">
                {
                    leftComponents.map((componentGroup, index) => {
                        const {title, list} = componentGroup
                        const children = list.map((component, index) => {
                            return (
                                <div
                                    key={index}
                                    className="component-item"
                                    onClick={() => {
                                        addFormItem(component)
                                    }}
                                >
                                    <Tag>
                                        {component.__config__.label}
                                    </Tag>
                                </div>
                            )
                        })
                        return (
                            <div className={'component-list'} key={index}>
                                <div className="component-title">
                                    {title}
                                </div>
                                {children}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
