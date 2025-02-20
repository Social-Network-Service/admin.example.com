import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);
    let myCount = 3;

    useEffect(() => {
        const id = setInterval(() => {
            setCountdown(--myCount);
            if (myCount <= 0) {
                window.clearInterval(id)
                navigate(`/Login`);
            }
        }, 1000)
    }, [])

    return (
        <>
            注销成功, {countdown}秒后自动跳转到登录。
        </>
    )
}