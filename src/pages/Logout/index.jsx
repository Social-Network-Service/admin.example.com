import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);
    const [id, setId] = useState(null);
    useEffect(() => {
        let _id = setInterval(() => {
            setCountdown((prevState) => {
                if (prevState - 1 <= 0) {
                    _id && window.clearInterval(_id)
                    navigate(`/Login`);
                }

                return prevState - 1
            });
        }, 1000)
        setId(_id);
    }, [])

    function onClickLogin() {
        id && window.clearInterval(id)
        navigate(`/Login`);
    }

    return (
        <div>
            注销成功, {countdown}秒后自动跳转到
            <a style={{cursor: 'pointer', color: 'var(--info)'}} onClick={() => onClickLogin()}>登录</a> 。
        </div>
    )
}