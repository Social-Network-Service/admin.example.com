import React, {useReducer, useContext, useCallback} from "react";
import {
  formReducer,
  initialState,
  createSetFormConfigAction,
  createAddFormItemAction,
  createDeleteFormItemAction,
  createSetSelectIndexAction,
  createSetComponentPropertyAction
} from "./reducer";

export const PageContext = React.createContext(null);

export function usePage() {
  return useContext(PageContext);
}

export function PageProvider({children}) {
  // 使用useReducer替代多个useState
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  // 使用useCallback包装dispatch函数，确保引用稳定性
  const setFormConfig = useCallback((data) => {
    dispatch(createSetFormConfigAction(data));
  }, []);

  const addFormItem = useCallback((component) => {
    dispatch(createAddFormItemAction(component));
  }, []);

  const deleteFormItem = useCallback((index) => {
    dispatch(createDeleteFormItemAction(index));
  }, []);

  const setSelectIndex = useCallback((index) => {
    dispatch(createSetSelectIndexAction(index));
  }, []);

  const setComponentProperty = useCallback((name, value) => {
    dispatch(createSetComponentPropertyAction(name, value));
  }, []);

  // 解构状态，便于使用
  const {formConfig, formItemConfig, selectIndex} = state;

  // 将所有状态和方法组织到一个对象中
  const contextValue = {
    // 状态
    formConfig,
    formItemConfig,
    selectIndex,
    // 方法
    setFormConfig,
    addFormItem,
    deleteFormItem,
    setSelectIndex,
    setComponentProperty
  };

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
}