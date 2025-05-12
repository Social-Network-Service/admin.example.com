import {Form,Button, Upload} from 'antd';
import React from "react";
import {PlusOutlined} from "@ant-design/icons";

export default () => {
  const {
    action = null,
    innerBtn,
    msg = '',
    accept = 'image/jpeg,image/png,image/jpg,image/gif',
    listType = 'picture-card',
    fileSize = 4,
    fileSizeUnit = 'Mb',
    initialImages = [],
    multiple = true,
  } = {};


  return (
    <Form>
      <Form.Item label={'文件'} name={'file'}>
        <Upload
          accept={accept}
          action={action}
          listType={listType}
        >
          <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>
              上传图片
            </div>
          </button>
        </Upload>
      </Form.Item>
    </Form>

  )
}