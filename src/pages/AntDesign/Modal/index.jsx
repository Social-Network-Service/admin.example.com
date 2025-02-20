import {Button} from 'antd';
import {Modal} from 'antd';

export default function ButtonDemo() {

    const info = () => {
        Modal.info({
            title: '消息详情',
            closable: true,
            content: (
                /*<div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>*/
                `${JSON.stringify({name: 'Tome', age: 18})}`
            ),
            maskClosable: true,
            icon: null,
            footer: null,
        });
    };

    return (
        <Button type="primary" onClick={info}>显示展示JSON内容的对话框</Button>
    )
}