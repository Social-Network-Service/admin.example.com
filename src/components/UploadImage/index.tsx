import {Image, Upload, message} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import type {GetProp, UploadFile, UploadProps} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type ImageType = {
    uid: string;
    name: string;
    url?: string;
    path?: string;
};

type ListType = 'picture-card' | 'picture' | 'text' | 'picture-circle';

type IProps = {
    action?: string;
    innerBtn?: React.ReactNode;
    accept?: string;
    listType?: ListType;
    msg?: string;
    fileSize?: number;
    fileSizeUnit?: string;
    initialImages?: any[];
    multiple?: boolean;
};

/**
 * accept: 接受上传的文件类型，详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
 * listType: 上传列表的内建样式，支持四种基本样式 text, picture, picture-card 和 picture-circle
 * innerBtn: 自定义上传组件样式
 * multiple: 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件
 * fileSize: 上传文件大小限制
 * fileSizeUnit: 文件单位： kb、Mb
 * msg: 上传文件类型错误提示文案
 * */
const ImageUpload = ({
                         action=null,
                         innerBtn,
                         msg = '',
                         accept = 'image/jpeg,image/png,image/jpg,image/gif',
                         listType = 'picture-card',
                         fileSize = 4,
                         fileSizeUnit = 'Mb',
                         initialImages = [],
                         multiple = true,
                         ...rest
                     }: IProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<any[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (initialImages && initialImages.length > 0) {
            // 将接口返回的图片数据转换为 UploadFile 格式
            const fileListData = initialImages?.map((image: ImageType) => ({
                uid: image.uid,
                name: image.name,
                status: 'done',
                url: image.path
            }));
            setFileList(fileListData);
        }
    }, [initialImages.length]);

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const beforeUpload = useCallback(
        (file: File) => {
            let isLTM: boolean = false;
            const is_JPG_PNG_GIF = /^image\/(jpeg|jpg|png|gif)$/.test(file.type);

            if (!is_JPG_PNG_GIF) {
                messageApi.error(msg || '上传图片格式应为jpeg、jpg、png、gif!');
                return Upload.LIST_IGNORE;
            }

            if (fileSizeUnit === 'kb') {
                isLTM = file.size / 1024 > fileSize;
            } else if (fileSizeUnit === 'Mb') {
                isLTM = file.size / 1024 / 1024 > fileSize;
            }

            if (isLTM) {
                messageApi.error(
                    msg || `上传图片大小不能超过 ${fileSize}${fileSizeUnit}!`
                );
                return Upload.LIST_IGNORE;
            }

            return is_JPG_PNG_GIF && isLTM;
        },
        [fileSize, msg]
    );

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
    }


    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>
                上传图片
            </div>
        </button>
    );

    const handleRemove = (file: Record<string, any>) => {
        setFileList(
            fileList.filter((img: { name: string }) => img.name !== file.name)
        );
    };

    return (
        <>
            {contextHolder}
            <Upload
                accept={accept}
                action={action}
                fileList={fileList}
                multiple={multiple}
                listType={listType}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                onRemove={handleRemove}
            >
                {innerBtn || uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{display: 'none'}}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage('')
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default ImageUpload;
