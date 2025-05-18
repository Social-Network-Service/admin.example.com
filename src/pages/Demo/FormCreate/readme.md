## 表单设计器

根据config.js组件配置，可视化配置组件及属性。

```javascript
const formItemList = formItems.map((formItem, index) => {
  let formItemComponent = null;
  switch (formItem.tag) {
    case 'input':
      formItemComponent = <ProFormText label={`字段${index + 1}`} key={index}/>
      break;
    case 'textarea':
      formItemComponent = <ProFormTextArea label={`字段${index + 1}`} key={index}/>
      break;
    case 'input_password':
      formItemComponent = <ProFormText.Password label={`字段${index + 1}`} key={index}/>
      break;
    default:
      formItemComponent = <span key={index}>未知tag={formItem.tag}</span>
      break;
  }
  return <div className={'form-item-wrapper'}>
    {formItemComponent}
    <DeleteOutlined onClick={(event) => {
      event.stopPropagation()
      deleteFormItem(index)
    }}/>
  </div>
})
```

## 表单解析器

把导出的json表单，解析为一个真实表单的程序

## 代码生成器

生成jsx组件文件

## 表单预览器

preview.html


### 参考文献

[form-generator](https://github.com/JakHuang/form-generator)]