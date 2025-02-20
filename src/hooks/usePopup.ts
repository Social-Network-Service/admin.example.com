import {useState} from 'react';

type PopupParams = {
    visible: boolean;
};

/**
 * 弹窗 Hook
 * @param params {PopupParams} Hook 参数
 * */
export default function usePopup(params: PopupParams = {visible: false}) {
    const [visible, setVisible] = useState(params?.visible);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return {
        visible,
        setVisible,
        show,
        hide,
    };
}
