import {Button} from "antd";
import React from "react";

export default (props) => {
    let num = Math.ceil(10);
    let arr = new Array(num).fill(null).map(() => parseInt(Math.random() * 100))
    return (
        <div>
            <Button type="primary" onClick={() => {
                props.updateRefreshKey();
            }}>刷新页面,重新渲染</Button>
            <ul>
                {
                    arr.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}