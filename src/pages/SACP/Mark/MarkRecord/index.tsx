/*eslint-disable*/
import {useState, useEffect, useCallback} from "react";
import {ProFormSelect, QueryFilter} from "@ant-design/pro-components";

import {ActionType, createActionFun} from "@/utils/action";
import {Card, List} from "antd";

import MarkItem from "./MarkItem";
import "./index.scss";
import {Message} from "@/services"
import Waterfall from './Waterfall'

export type MarkItemType = {
    user_id: string; // 用户ID
    keyframe_id: string; // 关键帧ID
    snapshot_url: string; // 关键帧图片URL
    labels_num: number; // 用户在当前关键帧的标记数量
    res: number; // 评价结果，0-未打分，1-优秀
    operate_time: string; // 操作时间
};

export default () => {
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState<number>(0);
    const [markList, setMarkList] = useState<Array<MarkItemType>>([]);
    const getRecordList = useCallback((data = {}) => {
        Message.templateList({
            current,
            pageSize: 20,
            ...data
        }).then((result) => {
            result = {
                "code": 0,
                "message": "success",
                "data": [
                    {
                        "user_id": "9Xy49752",
                        "keyframe_id": "wy2XoNqk",
                        "snapshot_url": "https://static-kefu.xoyo.com/scap/dev/20250124/label_upload_imgs/4f94970f-baaa-40fb-848f-07144a40cd08.png",
                        "labels_num": 1,
                        "res": 0,
                        "operate_time": "2025-01-24 16:50:14",
                        "labels": [
                            {
                                "label_id": "OqQLAA5r",
                                "name": "凤翅紫金冠",
                                "alias": "",
                                "name_id": "O6G6Lo5R",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":114,\"y\":178,\"w\":171,\"h\":130,\"o\":[199.5,243],\"lt\":[114,178],\"lb\":[114,308],\"rt\":[285,178],\"rb\":[285,308],\"sw\":\"0.34897959\",\"sh\":\"0.15795869\",\"ow\":\"0.40714286\",\"oh\":\"0.29526124\"}}",
                                "creator": "曾维彬",
                                "time_ms": "0",
                                "path": [],
                                "id_path": []
                            }
                        ]
                    },
                    {
                        "user_id": "9Xy49752",
                        "keyframe_id": "7GZNpBG8",
                        "snapshot_url": "https://static-kefu.xoyo.com/scap/dev/20250124/label_upload_imgs/288dea35-9654-4305-b103-bc43f6f46a3b.png",
                        "labels_num": 3,
                        "res": 0,
                        "operate_time": "2025-01-24 16:46:29",
                        "labels": [
                            {
                                "label_id": "JGArb8yL",
                                "name": "藕丝步云履",
                                "alias": "",
                                "name_id": "e1qpeDGV",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":892,\"y\":69,\"w\":152,\"h\":126,\"o\":[968,132],\"lt\":[892,69],\"lb\":[892,195],\"rt\":[1044,69],\"rb\":[1044,195],\"sw\":\"0.12317666\",\"sh\":\"0.14893617\",\"ow\":\"0.78444084\",\"oh\":\"0.15602837\"}}",
                                "creator": "曾维彬",
                                "time_ms": "0",
                                "path": [],
                                "id_path": []
                            },
                            {
                                "label_id": "wqW92Ky8",
                                "name": "原子弹",
                                "alias": "",
                                "name_id": "zV5LM6qN",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":717,\"y\":342,\"w\":143,\"h\":123,\"o\":[788.5,403.5],\"lt\":[717,342],\"lb\":[717,465],\"rt\":[860,342],\"rb\":[860,465],\"sw\":\"0.11588331\",\"sh\":\"0.14539007\",\"ow\":\"0.63897893\",\"oh\":\"0.47695035\"}}",
                                "creator": "曾维彬",
                                "time_ms": "0",
                                "path": [],
                                "id_path": []
                            },
                            {
                                "label_id": "Xy4gk9G2",
                                "name": "锁子黄金甲",
                                "alias": "",
                                "name_id": "dVy8aR5Q",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":1028,\"y\":346,\"w\":104,\"h\":110,\"o\":[1080,401],\"lt\":[1028,346],\"lb\":[1028,456],\"rt\":[1132,346],\"rb\":[1132,456],\"sw\":\"0.08427877\",\"sh\":\"0.13002364\",\"ow\":\"0.87520259\",\"oh\":\"0.47399527\"}}",
                                "creator": "曾维彬",
                                "time_ms": "0",
                                "path": [],
                                "id_path": []
                            }
                        ]
                    },
                    {
                        "user_id": "9Xy49752",
                        "keyframe_id": "Ey7vx2Gr",
                        "snapshot_url": "https://static-kefu.xoyo.com/scap/dev/20250117/question/20250117172105070861.png",
                        "labels_num": 1,
                        "res": 1,
                        "operate_time": "2025-01-24 14:42:56",
                        "labels": [
                            {
                                "label_id": "eqdkbK5V",
                                "name": "藕丝步云履",
                                "alias": "",
                                "name_id": "e1qpeDGV",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":199,\"y\":86,\"w\":160,\"h\":144,\"o\":[279,158],\"lt\":[199,86],\"lb\":[199,230],\"rt\":[359,86],\"rb\":[359,230],\"sw\":\"0.25437202\",\"sh\":\"0.29813665\",\"ow\":\"0.44356121\",\"oh\":\"0.32712215\"}}",
                                "creator": "曾维彬",
                                "time_ms": "0",
                                "path": [],
                                "id_path": []
                            }
                        ]
                    },
                    {
                        "user_id": "9Xy49752",
                        "keyframe_id": "OqQ07o5r",
                        "snapshot_url": "https://static-kefu.xoyo.com/scap/dev/20241220/video_label_snapshot/71/c374181e-9b1d-4d1b-9b8c-0d0b38defd9a.jpeg",
                        "labels_num": 1,
                        "res": 0,
                        "operate_time": "2025-01-24 11:42:01",
                        "labels": [
                            {
                                "label_id": "Vy8VgAqQ",
                                "name": "如意金箍棒",
                                "alias": "testa-alias",
                                "name_id": "zV5LMNqN",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":267,\"y\":186.421875,\"w\":123,\"h\":128,\"o\":[328.5,250.421875],\"lt\":[267,186.421875],\"lb\":[267,314.421875],\"rt\":[390,186.421875],\"rb\":[390,314.421875],\"sw\":\"0.06406250\",\"sh\":\"0.11851852\",\"ow\":\"0.17109375\",\"oh\":\"0.23187211\"}}",
                                "creator": "曾维彬",
                                "time_ms": "0",
                                "path": [],
                                "id_path": []
                            }
                        ]
                    },
                    {
                        "user_id": "9Xy49752",
                        "keyframe_id": "Xy4B0Xq2",
                        "snapshot_url": "https://static-kefu.xoyo.com/scap/dev/20250124/video_label_snapshot/71/c2249136-f7c1-4d34-a1f4-27f72f56b2f7.jpeg",
                        "labels_num": 1,
                        "res": 1,
                        "operate_time": "2025-01-24 10:57:52",
                        "labels": [
                            {
                                "label_id": "B5v4DBGd",
                                "name": "sdfsdf",
                                "alias": "TEST",
                                "name_id": "vwy9jg5o",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":32,\"y\":357.421875,\"w\":313,\"h\":174,\"o\":[188.5,444.421875],\"lt\":[32,357.421875],\"lb\":[32,531.421875],\"rt\":[345,357.421875],\"rb\":[345,531.421875],\"sw\":\"0.16302083\",\"sh\":\"0.16111111\",\"ow\":\"0.09817708\",\"oh\":\"0.41150174\"}}",
                                "creator": "曾维彬",
                                "time_ms": "529333.918",
                                "path": [],
                                "id_path": []
                            }
                        ]
                    },
                    {
                        "user_id": "9Xy49752",
                        "keyframe_id": "dGwEpp5j",
                        "snapshot_url": "https://static-kefu.xoyo.com/scap/dev/20241224/video_label_snapshot/71/a1ec7808-ab5e-4f9d-974d-d12ce3f563ed.jpeg",
                        "labels_num": 2,
                        "res": 0,
                        "operate_time": "2025-01-23 13:37:54",
                        "labels": [
                            {
                                "label_id": "0qx1YBG6",
                                "name": "如意金箍棒",
                                "alias": "testa-alias",
                                "name_id": "zV5LMNqN",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":451.5,\"y\":663.5,\"w\":155,\"h\":148,\"o\":[529,737.5],\"lt\":[451.5,663.5],\"lb\":[451.5,811.5],\"rt\":[606.5,663.5],\"rb\":[606.5,811.5],\"sw\":\"0.08072917\",\"sh\":\"0.13703704\",\"ow\":\"0.27552083\",\"oh\":\"0.68287037\"}}",
                                "creator": "曾维彬",
                                "time_ms": "114257.387",
                                "path": [],
                                "id_path": []
                            },
                            {
                                "label_id": "pGVMVRqg",
                                "name": "laladelvpingfu",
                                "alias": "绿皮肤",
                                "name_id": "70qNk7GJ",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":759.5,\"y\":638.5,\"w\":128,\"h\":121,\"o\":[823.5,699],\"lt\":[759.5,638.5],\"lb\":[759.5,759.5],\"rt\":[887.5,638.5],\"rb\":[887.5,759.5],\"sw\":\"0.06666667\",\"sh\":\"0.11203704\",\"ow\":\"0.42890625\",\"oh\":\"0.64722222\"}}",
                                "creator": "曾维彬",
                                "time_ms": "114257.387",
                                "path": [],
                                "id_path": []
                            }
                        ]
                    },
                    {
                        "user_id": "9Xy49752",
                        "keyframe_id": "wqW70Eq8",
                        "snapshot_url": "https://static-kefu.xoyo.com/scap/dev/20241223/video_label_snapshot/69/55a312c1-eefb-4811-bcc6-6c005281befd.jpeg",
                        "labels_num": 1,
                        "res": 0,
                        "operate_time": "2025-01-23 13:37:54",
                        "labels": [
                            {
                                "label_id": "Z51ZngqQ",
                                "name": "AK",
                                "alias": "",
                                "name_id": "w1yrdWq6",
                                "data": "{\"v\":\"v1\",\"d\":{\"x\":5.25,\"y\":366,\"w\":310,\"h\":81,\"o\":[160.25,406.5],\"lt\":[5.25,366],\"lb\":[5.25,447],\"rt\":[315.25,366],\"rb\":[315.25,447],\"sw\":\"0.16145833\",\"sh\":\"0.07500000\",\"ow\":\"0.08346354\",\"oh\":\"0.37638889\"}}",
                                "creator": "曾维彬",
                                "time_ms": "1288.331",
                                "path": [],
                                "id_path": []
                            }
                        ]
                    }
                ],
                "current": 1,
                "pageSize": 20,
                "total": 7
            }
            const {code, data, total} = result;
            if (code === 0) {
                setMarkList(data);
                setTotal(total);
            }
        });
    }, []);
    const markOptions: any[] = [];

    useEffect(() => {
        getRecordList();
    }, [current]);

    const onAction = createActionFun({
        [ActionType.CHECK](data: MarkItemType) {

        },
    });

    const onFinish = (data: any) => {
        if (data?.res === "") delete data.res;
        getRecordList(data);
    };

    const [images, setImages] = useState(getRandomImages());

    return (
        <div className="mark-record">
            <Card size="small" style={{marginBottom: "16px"}}>
                <QueryFilter autoFocusFirstInput={false} style={{padding: 0}} onFinish={onFinish} onReset={onFinish}>
                    <ProFormSelect
                        name="res"
                        label={'标注打分'}
                        options={markOptions}
                    />
                </QueryFilter>
            </Card>

            <Card
                size="small"
                title={`关键帧图片列表`}
            >
                {/*<List
                    grid={{gutter: 0}}
                    pagination={{
                        position: "bottom",
                        pageSize: 20,
                        total,
                        current,
                        onChange(pageNum) {
                            setCurrent(pageNum);
                        }
                    }}
                    dataSource={markList}
                    renderItem={(item) => <MarkItem item={item} onAction={onAction} key={item.keyframe_id}/>}
                />*/}

                <Waterfall mode='fixed-width' images={images} footerRender={(item: any, index: any) => {
                    return <div className='footer'>
                        <p>索引 = {index}</p>
                        <p>图片地址 = {item.url}</p>
                    </div>
                }}></Waterfall>

                <div style={{textAlign: "center"}}>
                    <button onClick={() => {
                        setImages(images.concat(getRandomImages()));
                    }}>加载更多
                    </button>
                </div>
            </Card>
        </div>
    );
};

function getRandomImages() {
    const images = [
        "/images/wall/260275992_443951064017388_8120694513404601001_n.jpeg",
        "/images/wall/299180709_475571564022110_5374496400830654462_n.jpeg",
        "/images/wall/300303054_1084974882129458_4224607917202559964_n.jpeg",
        "/images/wall/315761796_454019013338901_3773517364246318115_n.jpeg",
        "/images/wall/319801814_154315077378726_9055366276893967024_n.jpeg",
        "/images/wall/20250117172105070861.png",
        "/images/wall/a1ec7808-ab5e-4f9d-974d-d12ce3f563ed.jpeg",
        "/images/wall/c374181e-9b1d-4d1b-9b8c-0d0b38defd9a.jpeg",
        "/images/wall/c2249136-f7c1-4d34-a1f4-27f72f56b2f7.jpeg",
        "/images/wall/4f94970f-baaa-40fb-848f-07144a40cd08.png",
        "/images/wall/55a312c1-eefb-4811-bcc6-6c005281befd.jpeg",
        "/images/wall/288dea35-9654-4305-b103-bc43f6f46a3b.png",
        "/images/wall/219349120_800300317313609_7691747447293727933_n.jpeg",
    ]

    return new Array(20).fill(null).map(() => {
        return images[Math.floor(Math.random() * images.length)];
    })
}
