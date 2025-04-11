import {Button} from 'antd';
import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';

export function getSearchParams(search = location.search) {
    return Object.fromEntries(new URLSearchParams(search));
}

export default () => {
    const navigate = useNavigate();
    // 获取当前路由的完整信息
    const location = useLocation();
    // 获取动态路由参数
    const params = useParams();
    // 获取查询参数
    const [searchParams] = useSearchParams();
    console.log('完整路由信息:', location);
    console.log('路由参数:', params);
    console.log('查询参数:', Object.fromEntries(searchParams));
    // Object.fromEntries() 静态方法将键值对列表转换为一个对象。

    const handleUpdateParams = () => {
        // 获取当前URL的查询参数
        const queryParams = new URLSearchParams(location.search);
        // 更新参数
        queryParams.set('value', Math.random());
        // 构建新的查询字符串
        const newSearch = queryParams.toString();
        // 使用history.push更新URL
        navigate({pathname: location.pathname, search: newSearch, hash: location.hash});
    };

    return (
        <>
            <div>完整路由信息: {JSON.stringify(location)}</div>
            <div>路由参数: {JSON.stringify(params)}</div>
            <div>查询参数: {JSON.stringify(Object.fromEntries(searchParams))}</div>
            <Button onClick={handleUpdateParams} type="primary">更新参数</Button>
        </>
    )
}