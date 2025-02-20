import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    // entries() 方法返回一个用于遍历该对象中包含的所有键/值对的迭代器。
    const paramsIterator = params.entries()
    // Object.fromEntries() 静态方法将键值对列表转换为一个对象。
    const paramsObject = Object.fromEntries(paramsIterator);
    console.log({params, paramsIterator, paramsObject});

    const handleUpdateParams = () => {
        // 获取当前URL的查询参数
        const queryParams = new URLSearchParams(location.search);
        // 更新参数
        queryParams.set('value', Math.random());
        // 构建新的查询字符串
        const newSearch = queryParams.toString();
        // 使用history.push更新URL
        navigate({pathname: location.pathname, search: newSearch});
    };

    return (
        <>
            <Button onClick={handleUpdateParams} type="primary">更新参数</Button>
        </>
    )
}