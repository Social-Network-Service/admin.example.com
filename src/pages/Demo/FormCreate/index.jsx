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
      },
      {
        tag: 'textarea',
      },
      {
        tag: 'input_password',
      },
    ]
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
    addFormItem(data) {
      setState((preState) => {
        return {
          ...preState,
          formItemConfig: preState.formItemConfig.concat(data)
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