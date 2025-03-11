/*eslint-disable*/
import {useState, useEffect, useCallback} from "react";

import "./index.scss";
import Waterfall from './Waterfall'

export default () => {
    const [images, setImages] = useState(getRandomImages());

    return (
        <div className="image-page">
            <Waterfall mode='fixed-width' images={images} footerRender={(item: any, index: any) => {
                return <div className='footer'>
                    <p>索引 = {index}</p>
                    <p>图片地址 = {item.url}</p>
                </div>
                /*return <div></div>*/
            }}></Waterfall>

            <div style={{textAlign: "center"}}>
                <button onClick={() => {
                    setImages(images.concat(getRandomImages()));
                }}>加载更多
                </button>
            </div>
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
