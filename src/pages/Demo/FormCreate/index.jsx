import {useState} from "react";
import Layout from './layout'
import HeaderBar from './components/HeaderBar'
import ComponentBar from './components/ComponentBar'
import FormBar from './components/FormBar'
import PropertyBar from './components/PropertyBar'
import './index.scss'
import {GlobalDataContext} from "./contexts/GlobalDataContext";

export default () => {
  const [state, setState] = useState({
    formConfig: {
      layout: "horizontal",
      labelAlign: "right",
    },
    formItemConfig: [
      {
        tag: 'input',
        name: 'field_1',
        label: '字段1',
      },
      {
        tag: 'textarea',
        name: 'field_2',
        label: '字段2',
      },
      {
        tag: 'input_password',
        name: 'field_3',
        label: '字段3',
      },
    ],
    selectIndex: null,
  })

  const value = {
    state,
    setState,
    setFormConfig(data) {
      setState((preState) => {
        return {
          ...preState,
          formConfig: {
            ...preState.formConfig,
            ...data,
          }
        }
      })
    },
    addFormItem(component) {
      setState((preState) => {
        const formItemConfig = {
          tag: component.__config__.tag,
          name: `field_${preState.formItemConfig.length + 1}`,
          label: `字段${preState.formItemConfig.length + 1}`,
        }

        return {
          ...preState,
          formItemConfig: preState.formItemConfig.concat(formItemConfig)
        }
      })
    },
    deleteFormItem(index) {
      setState(preState => {
        preState.formItemConfig.splice(index, 1);

        return {
          ...preState,
        }
      })
    },
    setSelectIndex(index) {
      setState(preState => {
        return {
          ...preState,
          selectIndex: index,
        }
      })
    },
    setComponentProperty(name, value) {
      setState(preState => {
        // console.log({name, value});
        const {formItemConfig, selectIndex} = preState;
        const itemConfig = formItemConfig[selectIndex];
        itemConfig[name] = value;
        return {
          ...preState,
          formItemConfig,
        }
      })
    }
  }

  return (
    <GlobalDataContext.Provider value={value}>
      <Layout
        headerRender={() => (<HeaderBar/>)}
        leftRender={() => (<ComponentBar/>)}
        centerRender={() => (<FormBar/>)}
        rightRender={() => (<PropertyBar/>)}
      >
      </Layout>
    </GlobalDataContext.Provider>
  )
}