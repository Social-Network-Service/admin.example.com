import {Tag} from 'antd'
import {
  inputComponents, selectComponents, layoutComponents
} from './config'
import {usePage} from "../contexts/PageContext";

export default function ComponentBar() {
  const {addFormItem} = usePage()
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
