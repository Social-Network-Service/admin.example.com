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
      "tag": "input",
      "name": "field_1",
      "label": "1.单行文本输入",
      "placeholder": "请输入",
      "defaultValue": "西山居"
    },
    {
      "tag": "textarea",
      "name": "field_2",
      "label": "2.多行文本输入",
      "placeholder": "请输入",
      "defaultValue": ""
    },
    {
      "tag": "select",
      "name": "field_3",
      "label": "3.下拉选择",
      "placeholder": "请选择",
      "defaultValue": ["2"],
      "options": [
        {"label": "选项一", "value": "1"},
        {"label": "选项二", "value": "2"}
      ]
    },
    {
      "tag": "radio-group",
      "name": "field_4",
      "label": "4.单选",
      "defaultValue": "2",
      "options": [
        {"label": "选项一", "value": "1"},
        {"label": "选项二", "value": "2"}
      ]
    },
    {
      "tag": "checkbox-group",
      "name": "field_5",
      "label": "5.多选",
      "options": [
        {"label": "选项一", "value": "1"},
        {"label": "选项二", "value": "2"}
      ]
    }
  ],
  selectIndex: null,
};

// Action创建函数
export const createSetFormConfigAction = (data) => ({
  type: ActionTypes.SET_FORM_CONFIG,
  data: data
});

export const createAddFormItemAction = (component) => ({
  type: ActionTypes.ADD_FORM_ITEM,
  data: component
});

export const createDeleteFormItemAction = (index) => ({
  type: ActionTypes.DELETE_FORM_ITEM,
  data: index
});

export const createSetSelectIndexAction = (index) => ({
  type: ActionTypes.SET_SELECT_INDEX,
  data: index
});

export const createSetComponentPropertyAction = (name, value) => ({
  type: ActionTypes.SET_COMPONENT_PROPERTY,
  data: {name, value}
});

// Reducer函数 - 使用Immer的可变更新风格
export function formReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_FORM_CONFIG:
      // 直接修改draft
      Object.assign(state.formConfig, action.data);
      break;

    case ActionTypes.ADD_FORM_ITEM: {
      const component = action.data;
      const tag = component.__config__.tag;
      const newItem = {
        tag: tag,
        name: `field_${state.formItemConfig.length + 1}`,
        label: `字段${state.formItemConfig.length + 1}`,
      };

      // 为 select、radio-group 和 checkbox-group 组件添加默认的 options 属性
      if (tag === 'select') {
        newItem.placeholder = '请选择';
        newItem.defaultValue = null;
        newItem.options = [
          {label: '选项一', value: '1'},
          {label: '选项二', value: '2'}
        ];
      } else if (tag === 'radio-group' || tag === 'checkbox-group') {
        newItem.options = [
          {label: '选项一', value: '1'},
          {label: '选项二', value: '2'}
        ];
      }

      state.formItemConfig.push(newItem);
      break;
    }

    case ActionTypes.DELETE_FORM_ITEM: {
      const index = action.data;

      state.formItemConfig.splice(index, 1);

      if (state.selectIndex === index) {
        state.selectIndex = null;
      } else if (state.selectIndex > index) {
        state.selectIndex -= 1;
      }
      break;
    }

    case ActionTypes.SET_SELECT_INDEX:
      state.selectIndex = action.data;
      break;

    case ActionTypes.SET_COMPONENT_PROPERTY: {
      const {name, value} = action.data;
      const {selectIndex} = state;

      // 确保有选中的索引
      if (selectIndex === null || selectIndex < 0 || selectIndex >= state.formItemConfig.length) {
        return;
      }

      state.formItemConfig[selectIndex][name] = value;
      break;
    }

    default:
      // 在Immer中，如果不做任何更改，可以什么都不返回
      break;
  }
}
