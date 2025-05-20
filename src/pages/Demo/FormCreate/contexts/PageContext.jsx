import React, {useReducer, useContext, useCallback} from "react";
import {
  formReducer,
  initialState,
  setFormConfig,
  addFormItem,
  deleteFormItem,
  setSelectIndex,
  setComponentProperty
} from "./reducer";

export const PageContext = React.createContext(null);

export function usePage() {
  return useContext(PageContext);
}

export function PageProvider({children}) {
  // 使用useReducer替代多个useState
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  // 使用useCallback包装dispatch函数，确保引用稳定性
  const handleSetFormConfig = useCallback((data) => {
    dispatch(setFormConfig(data));
  }, []);

  const handleAddFormItem = useCallback((component) => {
    dispatch(addFormItem(component));
  }, []);

  const handleDeleteFormItem = useCallback((index) => {
    dispatch(deleteFormItem(index));
  }, []);

  const handleSetSelectIndex = useCallback((index) => {
    dispatch(setSelectIndex(index));
  }, []);

  const handleSetComponentProperty = useCallback((name, value) => {
    dispatch(setComponentProperty(name, value));
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
    setFormConfig: handleSetFormConfig,
    addFormItem: handleAddFormItem,
    deleteFormItem: handleDeleteFormItem,
    setSelectIndex: handleSetSelectIndex,
    setComponentProperty: handleSetComponentProperty
  };

  return (
    <PageContext.Provider value={contextValue}>
      {children}
    </PageContext.Provider>
  );
}