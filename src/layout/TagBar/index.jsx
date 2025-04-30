import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeftOutlined, ReloadOutlined, HomeOutlined} from '@ant-design/icons';
import Tags from './Tags';
import './index.scss';

const TagBar = () => {
  const navigate = useNavigate();

  return (
    <div className="tag-bar">
      <ArrowLeftOutlined onClick={() => navigate(-1)}/>
      <ReloadOutlined onClick={() => window.location.reload()}/>
      <HomeOutlined onClick={() => navigate('/dashboard')}/>
      <Tags/>
    </div>
  );
};

export default TagBar;
