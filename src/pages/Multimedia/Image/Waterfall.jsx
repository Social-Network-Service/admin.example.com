import React from 'react';
import './Waterfall.scss';

// 防抖函数
function debounce(fn, delay = 300) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}

export default class Waterfall extends React.Component {
    static defaultProps = {
        mode: 'fixed-column',  // 'fixed-width' | 'fixed-column'
        columnWidth: 200,     // mode='fixed-width' 时生效
        columnCount: 6,       // mode='fixed-column' 时生效
        columnGap: 5,
    }

    constructor(props) {
        super(props)
        this.state = {
            columnMaxHeight: 0,
            imageList: this.props.images.map(url => {
                return {
                    id: Math.ceil(Math.random() * 100000000),
                    url,
                    top: 0,
                    left: 0,
                }
            }),
        }
        this.debouncedResize = debounce(this.handleResize, 300);
    }

    componentDidMount() {
        const rootEle = this.refs['container'];
        const {width: containerWidth} = rootEle.getBoundingClientRect();
        this.calculateLayout(containerWidth);

        // 添加窗口大小变化监听，使用防抖后的函数
        window.addEventListener('resize', this.debouncedResize);
    }

    componentWillUnmount() {
        // 移除窗口大小变化监听
        window.removeEventListener('resize', this.debouncedResize);
    }

    handleResize = () => {
        const rootEle = this.refs['container'];
        if (rootEle) {
            const {width: containerWidth} = rootEle.getBoundingClientRect();
            this.calculateLayout(containerWidth);
        }
    }

    calculateLayout(containerWidth) {
        const {mode, columnWidth: fixedWidth, columnCount: fixedCount, columnGap} = this.props;

        let columnCount, columnWidth;

        if (mode === 'fixed-width') {
            // 固定宽度模式：根据容器宽度和列宽计算列数
            columnWidth = fixedWidth;
            columnCount = Math.floor((containerWidth + columnGap) / (columnWidth + columnGap));
        } else {
            // 固定列数模式：根据容器宽度和列数计算列宽
            columnCount = fixedCount;
            columnWidth = (containerWidth - ((columnCount - 1) * columnGap)) / columnCount;
        }

        this.columnGap = columnGap;
        this.columnCount = columnCount;
        this.columnWidth = columnWidth;
        this.columnHeightArr = Array.apply(null, {length: this.columnCount}).map(() => 0);
        this.startIndex = 0;

        this.setState({columnMaxHeight: 0})

        // 重新计算布局后加载图片
        this.load();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.images.length > prevProps.images.length) {
            let startIndex = prevProps.images.length;
            let newImages = this.props.images.slice(startIndex, this.props.images.length);
            let newItems = newImages.map(url => {
                return {
                    id: Math.ceil(Math.random() * 100000000),
                    url,
                    top: 0,
                    left: 0,
                }
            });
            this.setState({
                imageList: this.state.imageList.concat(newItems)
            }, () => {
                this.load();
            });
        }
    }

    async load() {
        let i = this.startIndex;
        for (i; i < this.state.imageList.length; i++) {
            this.startIndex++;
            const item = this.state.imageList[i];
            const {url} = item;
            let image = await asyncLoadImage(url).catch(err => {
                console.log('err 加载图片错误：', url, err);
            });

            if (!image) return;

            const footerEle = this.refs[`footer${i}`];
            const react = footerEle.getBoundingClientRect();
            const {height: footerHeight} = react;
            const scaleHeight = (this.columnWidth) / (image.width / image.height) + this.columnGap;
            const itemHeight = scaleHeight + footerHeight;

            let min = Math.min(...this.columnHeightArr);
            let minIndex = this.columnHeightArr.indexOf(min);

            this.state.imageList[i].left = minIndex * (this.columnWidth + this.columnGap);
            this.state.imageList[i].top = min;

            this.columnHeightArr[minIndex] = min + itemHeight;

            this.setState({
                columnMaxHeight: Math.max(...this.columnHeightArr),
                imageList: this.state.imageList
            });
        }
    }

    render() {
        const {footerRender} = this.props;
        return (
            <div ref='container' className="list" style={{height: this.state.columnMaxHeight + 'px'}}>
                {
                    this.state.imageList.map((item, idx) => {
                        return (
                            <div
                                className="list-item"
                                style={{
                                    width: this.columnWidth + "px",
                                    left: item.left + 'px',
                                    top: item.top + 'px'
                                }}
                                key={item.id}
                            >
                                <div className="image-wrapper">
                                    <img src={item.url}/>
                                </div>
                                <div ref={`footer${idx}`}>
                                    {footerRender(item, idx)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function asyncLoadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = url
        img.onload = () => {
            resolve(img)
        }
        img.onerror = (err) => {
            reject(err)
        }
    })
}