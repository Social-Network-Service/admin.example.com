const constantRoutes = [
    {
        name: '首页',
        path: '/',
    },
    {
        name: '游戏页',
        path: '/product/:product_key',
    },
];
const dynamicRoutes = []

function generateRoutes(menus) {
    const sidebarRoutes = filterAsyncRouter(sdata)
    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
    const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
}

function addRoutes(routes) {

}