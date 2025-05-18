import React, { useState, useContext } from "react";

export const PageContext = React.createContext(null);

export function usePage() {
  return useContext(PageContext);
}

export function PageProvider({ children }) {
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
        const { formItemConfig, selectIndex } = preState;
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
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}