import {Button} from 'antd';
import {message} from 'antd';

export default function ButtonDemo() {

    function onClickBtn() {
        const loading = message.loading({
            content: '加载中...',
            className: 'global-api-loading',
        })

        console.log(loading)

        setTimeout(() => {
            message.destroy()
        }, 3000)
    }

    return (
        <Button type="primary" onClick={onClickBtn}>显示全局加载</Button>
    )
}