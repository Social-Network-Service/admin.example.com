// 定义action类型
export const ActionTypes = {
  SET_FORM_CONFIG: 'SET_FORM_CONFIG',
  ADD_FORM_ITEM: 'ADD_FORM_ITEM',
  DELETE_FORM_ITEM: 'DELETE_FORM_ITEM',
  SET_SELECT_INDEX: 'SET_SELECT_INDEX',
  SET_COMPONENT_PROPERTY: 'SET_COMPONENT_PROPERTY'
};

// 初始状态
export const initialState = {
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
};

// Action创建函数
export const createSetFormConfigAction = (data) => ({
  type: ActionTypes.SET_FORM_CONFIG,
  payload: data
});

export const createAddFormItemAction = (component) => ({
  type: ActionTypes.ADD_FORM_ITEM,
  payload: component
});

export const createDeleteFormItemAction = (index) => ({
  type: ActionTypes.DELETE_FORM_ITEM,
  payload: index
});

export const createSetSelectIndexAction = (index) => ({
  type: ActionTypes.SET_SELECT_INDEX,
  payload: index
});

export const createSetComponentPropertyAction = (name, value) => ({
  type: ActionTypes.SET_COMPONENT_PROPERTY,
  payload: { name, value }
});

// Reducer函数
export function formReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_FORM_CONFIG:
      return {
        ...state,
        formConfig: {
          ...state.formConfig,
          ...action.payload
        }
      };

    case ActionTypes.ADD_FORM_ITEM: {
      const component = action.payload;
      const newItem = {
        tag: component.__config__.tag,
        name: `field_${state.formItemConfig.length + 1}`,
        label: `字段${state.formItemConfig.length + 1}`,
      };
      
      return {
        ...state,
        formItemConfig: [...state.formItemConfig, newItem]
      };
    }

    case ActionTypes.DELETE_FORM_ITEM: {
      const index = action.payload;
      const newFormItemConfig = [...state.formItemConfig];
      newFormItemConfig.splice(index, 1);
      
      // 更新选中索引
      let newSelectIndex = state.selectIndex;
      if (state.selectIndex === index) {
        newSelectIndex = null;
      } else if (state.selectIndex > index) {
        newSelectIndex = state.selectIndex - 1;
      }
      
      return {
        ...state,
        formItemConfig: newFormItemConfig,
        selectIndex: newSelectIndex
      };
    }

    case ActionTypes.SET_SELECT_INDEX:
      return {
        ...state,
        selectIndex: action.payload
      };

    case ActionTypes.SET_COMPONENT_PROPERTY: {
      const { name, value } = action.payload;
      const { selectIndex } = state;
      
      // 确保有选中的索引
      if (selectIndex === null || selectIndex < 0 || selectIndex >= state.formItemConfig.length) {
        return state;
      }
      
      // 创建新数组和新对象
      const newFormItemConfig = [...state.formItemConfig];
      newFormItemConfig[selectIndex] = {
        ...newFormItemConfig[selectIndex],
        [name]: value
      };
      
      return {
        ...state,
        formItemConfig: newFormItemConfig
      };
    }

    default:
      return state;
  }
}
