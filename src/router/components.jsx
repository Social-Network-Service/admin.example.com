import React, {lazy, Suspense} from 'react';
import {Spin} from 'antd';

const LoadingComponent = () => (
  <div style={{padding: '50px', textAlign: 'center'}}>
    <Spin size="large"/>
  </div>
);

// 包装成 React 组件
const wrapComponent = (LazyComponent) => {
  return () => (
    <Suspense fallback={<LoadingComponent/>}>
      <LazyComponent/>
    </Suspense>
  );
};

// 懒加载组件
const components = {
  '/login': wrapComponent(lazy(() => import('@/pages/login/index'))),
  '/dashboard': wrapComponent(lazy(() => import('@/pages/dashboard/index'))),
  '/user_center': wrapComponent(lazy(() => import('@/pages/user_center/index'))),
  '/404': wrapComponent(lazy(() => import('@/pages/404/index'))),

  '/SACP/Mark/MarkVideo': wrapComponent(lazy(() => import('@/pages/SACP/Mark/MarkVideo/index'))),
  '/SACP/Mark/MarkImage': wrapComponent(lazy(() => import('@/pages/SACP/Mark/MarkImage/index'))),
  '/SACP/Mark/MarkInference': wrapComponent(lazy(() => import('@/pages/SACP/Mark/MarkInference/index'))),
  '/SACP/Mark/QualityInspection': wrapComponent(lazy(() => import('@/pages/SACP/Mark/QualityInspection/index'))),
  '/SACP/Mark/MarkRecord': wrapComponent(lazy(() => import('@/pages/SACP/Mark/MarkRecord/index'))),

  '/AntDesign/Flex': wrapComponent(lazy(() => import('@/pages/AntDesign/Layout/Flex/index'))),
  '/AntDesign/Grid': wrapComponent(lazy(() => import('@/pages/AntDesign/Layout/Grid/index'))),
  '/AntDesign/Space': wrapComponent(lazy(() => import('@/pages/AntDesign/Layout/Space/index'))),
  '/AntDesign/Form': wrapComponent(lazy(() => import('@/pages/AntDesign/DataEntry/Form/index'))),
  '/AntDesign/FormItem': wrapComponent(lazy(() => import('@/pages/AntDesign/DataEntry/FormItem/index'))),
  '/AntDesign/Select': wrapComponent(lazy(() => import('@/pages/AntDesign/DataEntry/Select/index'))),
  '/AntDesign/Checkbox': wrapComponent(lazy(() => import('@/pages/AntDesign/DataEntry/Checkbox/index'))),
  '/AntDesign/Input': wrapComponent(lazy(() => import('@/pages/AntDesign/DataEntry/Input/index'))),
  '/AntDesign/Upload': wrapComponent(lazy(() => import('@/pages/AntDesign/DataEntry/Upload/index'))),
  '/AntDesign/Loading': wrapComponent(lazy(() => import('@/pages/AntDesign/Loading/index'))),
  '/AntDesign/Button': wrapComponent(lazy(() => import('@/pages/AntDesign/Button/index'))),
  '/AntDesign/Icons': wrapComponent(lazy(() => import('@/pages/AntDesign/Icons/index'))),
  '/AntDesign/Table': wrapComponent(lazy(() => import('@/pages/AntDesign/DataDisplay/Table/index'))),
  '/AntDesign/Tabs': wrapComponent(lazy(() => import('@/pages/AntDesign/DataDisplay/Tabs/index'))),
  '/AntDesign/Modal': wrapComponent(lazy(() => import('@/pages/AntDesign/Modal/index'))),
  '/AntDesign/Popover': wrapComponent(lazy(() => import('@/pages/AntDesign/Popover/index'))),

  '/AntDesignPro/PageContainer': wrapComponent(lazy(() => import('@/pages/AntDesignPro/PageContainer/index'))),

  '/Demo/AudioVisualization': wrapComponent(lazy(() => import('@/pages/Demo/AudioVisualization/index'))),
  '/Demo/FormCreate': wrapComponent(lazy(() => import('@/pages/Demo/FormCreate/index'))),
  '/Demo/CRUD': wrapComponent(lazy(() => import('@/pages/Demo/CRUD/index'))),
  '/Demo/CRUD/Analytics': wrapComponent(lazy(() => import('@/pages/Demo/CRUD/Analytics/index'))),

  '/Test/RefreshPage': wrapComponent(lazy(() => import('@/pages/Test/RefreshPage/index'))),
  '/Test/UpdateSearchParams': wrapComponent(lazy(() => import('@/pages/Test/UpdateSearchParams/index'))),

  '/Multimedia/Image': wrapComponent(lazy(() => import('@/pages/Multimedia/Image/index'))),
  '/Multimedia/Video': wrapComponent(lazy(() => import('@/pages/Multimedia/Video/index'))),

  '/component/RichTextEditor': wrapComponent(lazy(() => import('@/pages/component/RichTextEditor/index'))),

  '/system/user': wrapComponent(lazy(() => import('@/pages/system/user/index'))),
  '/system/rule': wrapComponent(lazy(() => import('@/pages/system/rule/index'))),
  '/system/permission': wrapComponent(lazy(() => import('@/pages/system/permission/index'))),
}

// 把【组件】转换成【元素】 TestComponent -> <TestComponent/>
export function getElement(key) {
  if (components[key]) {
    return React.createElement(components[key]);
  } else {
    console.warn(`Components not found, key=${key}`);
    return null;
  }
}

export default components