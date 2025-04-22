import {Button, Upload} from 'antd';
import React from "react";
import {PlusOutlined} from "@ant-design/icons";

export default ({
                    action = null,
                    innerBtn,
                    msg = '',
                    accept = 'image/jpeg,image/png,image/jpg,image/gif',
                    listType = 'picture-card',
                    fileSize = 4,
                    fileSizeUnit = 'Mb',
                    initialImages = [],
                    multiple = true,
                }) => {
    return (
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
    )
}