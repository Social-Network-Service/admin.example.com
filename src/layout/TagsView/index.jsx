import React, {useEffect, useState} from 'react';
import {Tag} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import {Scrollbars} from 'react-custom-scrollbars';
import './index.scss';

const TagsView = () => {
    const [visitedViews, setVisitedViews] = useState([{
        title: '首页',
        pathname: '/Dashboard',
        closable: false
    }]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        addView(location);
    }, [location]);

    const getRouteName = (pathname) => {
        const path = pathname.split('/').filter(Boolean)[0];
        const routeNames = {
            'Dashboard': '首页',
            'UserCenter': '用户中心',
            'Login': '登录',
            'Logout': '注销'
        };
        return routeNames[path] || '未知页面';
    };

    const addView = (view) => {
        if (view.pathname === '/' || view.pathname === '/Dashboard')
            return;

        setVisitedViews((prevViews) => {
            const isExist = prevViews.some((v) => v.pathname === view.pathname);
            if (!isExist) {
                return [...prevViews, {
                    title: view.state?.title || getRouteName(view.pathname),
                    pathname: view.pathname,
                    closable: view.pathname !== '/dashboard'
                }];
            }
            return prevViews;
        });
    };

    const closeView = (view) => {
        setVisitedViews((prevViews) => {
            const views = prevViews.filter((v) => v.pathname !== view.pathname);
            if (view.pathname === location.pathname) {
                const latestView = views.slice(-1)[0];
                if (latestView) {
                    navigate(latestView.pathname);
                } else {
                    navigate('/dashboard');
                }
            }
            return views;
        });
    };

    return (
        <div className="tags-view-container">
            <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                style={{width: '100%', height: '100%'}}
                renderView={props => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            overflowY: 'hidden',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex'
                        }}
                    />
                )}
            >
                {visitedViews.map((tag) => (
                    <Tag
                        key={tag.pathname}
                        closable={tag.closable}
                        color={location.pathname === tag.pathname ? 'blue' : 'default'}
                        onClick={() => navigate(tag.pathname)}
                        onClose={(e) => {
                            e.preventDefault();
                            closeView(tag);
                        }}
                    >
                        {tag.title}
                    </Tag>
                ))}
            </Scrollbars>
        </div>
    );
};

export default TagsView;
