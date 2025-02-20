import {MarkItemType} from "./index";
import {Tag, Card, Flex} from "antd";
import {ActionFunType, ActionType} from "@/utils/action";
import React from "react";

type Props = {
    item: MarkItemType;
    onAction: ActionFunType;
    key: any;
};

const MarkItem: React.FC<Props> = ({item, onAction}) => {
    return (
        <Card className={"mark-record-item"} size="small">
            <img
                className="mark-img"
                src={item.snapshot_url}
                alt=""
                width="100%"
                onClick={() => {
                    onAction(ActionType.CHECK, item);
                }}
            />
            <Flex>
                <Flex flex="0 0 auto">
                    更新时间：
                </Flex>
                <Flex flex="1 1 0">{item.operate_time}</Flex>
            </Flex>
            <Flex>
                <Flex flex="0 0 auto">
                    图片地址：
                </Flex>
                <Flex flex="1 1 0" style={{overflow: "hidden", whiteSpace: "normal", wordBreak: "break-all"}}>
                    {item.snapshot_url}
                </Flex>
            </Flex>
            <Flex align="center">
                <Flex flex="0 0 auto">标注打分：</Flex>
                <Flex flex="1 1 0">
                    <Tag color={item.res === 1 ? "#108ee9" : null}>
                        未标记
                    </Tag>
                </Flex>
                <Flex flex="0 0 auto">
                    <a
                        style={{color: "var(--primary)"}}
                        onClick={() => {

                        }}
                    >
                        标记优秀
                    </a>
                </Flex>
            </Flex>
        </Card>
    );
};

export default MarkItem