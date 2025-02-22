import {useContext} from "react";
import {Tag} from 'antd'
import {
  inputComponents, selectComponents, layoutComponents, formConf
} from './config'
import {GlobalDataContext} from "../contexts/GlobalDataContext";

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
      <div className="component-list">
        {
          leftComponents.map((componentGroup, index) => {
            const {title, list} = componentGroup
            const children = list.map((component, index) => {
              return (
                <div
                  key={index}
                  className="component-item"
                  onClick={() => {
                    addFormItem({
                      tag: component.__config__.tag
                    })
                  }}
                >
                  <Tag>
                    {component.__config__.label}
                  </Tag>
                </div>
              )
            })
            return (
              <div key={index}>
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
