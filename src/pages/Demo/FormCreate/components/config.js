// 表单属性【右面板】
export const formConf = {
  layout: "horizontal",
  labelAlign: "right",
}

// 输入型组件 【左面板】
export const inputComponents = [
  {
    // 组件的自定义配置
    __config__: {
      label: '单行文本',
      tag: 'input',
    }
  },
  {
    __config__: {
      label: '多行文本',
      tag: 'textarea',
    }
  }
]

// 选择型组件 【左面板】
export const selectComponents = [
  {
    __config__: {
      label: '下拉选择',
      tag: 'el-select',
    }
  },
  {
    __config__: {
      label: '单选框组',
      tag: 'el-radio-group',
    }
  },
  {
    __config__: {
      label: '多选框组',
      tag: 'el-checkbox-group',
    }
  }
]

// 布局型组件 【左面板】
export const layoutComponents = [
  {
    __config__: {
      label: '行容器',
      tag: 'row',
    }
  },
  {
    __config__: {
      label: '按钮',
      tag: 'el-button',
    }
  }
]
