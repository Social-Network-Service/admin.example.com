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

// Reducer函数 - 使用Immer的可变更新风格
export function formReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_FORM_CONFIG:
      // 直接修改draft
      Object.assign(state.formConfig, action.payload);
      break;

    case ActionTypes.ADD_FORM_ITEM: {
      const component = action.payload;
      const newItem = {
        tag: component.__config__.tag,
        name: `field_${state.formItemConfig.length + 1}`,
        label: `字段${state.formItemConfig.length + 1}`,
      };
      
      // 直接push到数组中
      state.formItemConfig.push(newItem);
      break;
    }

    case ActionTypes.DELETE_FORM_ITEM: {
      const index = action.payload;
      
      // 直接修改数组
      state.formItemConfig.splice(index, 1);
      
      // 更新选中索引
      if (state.selectIndex === index) {
        state.selectIndex = null;
      } else if (state.selectIndex > index) {
        state.selectIndex -= 1;
      }
      break;
    }

    case ActionTypes.SET_SELECT_INDEX:
      // 直接设置值
      state.selectIndex = action.payload;
      break;

    case ActionTypes.SET_COMPONENT_PROPERTY: {
      const { name, value } = action.payload;
      const { selectIndex } = state;
      
      // 确保有选中的索引
      if (selectIndex === null || selectIndex < 0 || selectIndex >= state.formItemConfig.length) {
        return; // 不做任何更改
      }
      
      // 直接修改对象属性
      state.formItemConfig[selectIndex][name] = value;
      break;
    }

    default:
      // 在Immer中，如果不做任何更改，可以什么都不返回
      break;
  }
}
