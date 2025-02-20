import {Tag} from 'antd'
import {
  inputComponents, selectComponents, layoutComponents, formConf
} from './config'

export default () => {

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
                    window.dispatchEvent(new CustomEvent('add_component', {detail: component}))
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
