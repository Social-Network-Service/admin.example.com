import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {ArrowLeftOutlined, ReloadOutlined, HomeOutlined, ArrowRightOutlined, SearchOutlined} from '@ant-design/icons';
import Tags from './Tags';
import './index.scss';
import {Button} from "antd";

const TagBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  // 监听历史记录状态变化
  useEffect(() => {
    // 检查是否可以后退
    setCanGoBack(window.history.length > 1);

    // 创建一个事件监听器来检测前进/后退状态变化
    const handlePopState = () => {
      setCanGoBack(window.history.length > 1);
      // 注意：无法直接检测是否可以前进，因为 history API 没有提供此功能
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location]);

  const handleGoBack = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  // 处理前进按钮点击
  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <div className="tag-bar">
      <Button color="default" variant="text" icon={<ArrowLeftOutlined/>} disabled={!canGoBack} onClick={handleGoBack}/>
      <Button color="default" variant="text" icon={<ArrowRightOutlined/>} disabled={!canGoForward}
              onClick={handleGoForward}/>
      <ReloadOutlined onClick={() => window.location.reload()}/>
      <HomeOutlined onClick={() => navigate('/dashboard')}/>
      <Tags/>
    </div>
  );
};

export default TagBar;
