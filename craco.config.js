const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // 修改 webpack 配置以支持无扩展名导入
            webpackConfig.resolve.extensions = [
                '.js',
                '.ts',
                '.jsx',
                '.tsx',
                '.json',
            ];

            // 添加路径别名
            webpackConfig.resolve.alias = {
                ...webpackConfig.resolve.alias,
                '@': path.resolve(__dirname, 'src'),
            };

            // 配置 CSS Modules
            const cssRule = webpackConfig.module.rules.find(rule => rule.oneOf);
            if (cssRule) {
                const moduleRules = cssRule.oneOf.filter(rule =>
                    rule.use && rule.use.some(use => use.loader && use.loader.includes('css-loader'))
                );

                moduleRules.forEach(rule => {
                    if (rule.test.toString().includes('module')) {
                        const cssLoader = rule.use.find(use => use.loader && use.loader.includes('css-loader'));
                        if (cssLoader) {
                            cssLoader.options = {
                                ...cssLoader.options,
                                modules: {
                                    localIdentName: '[local]__[hash:base64:5]',
                                    exportLocalsConvention: 'camelCase',
                                    getLocalIdent: (context, localIdentName, localName, options) => {
                                        // 去掉组件名前缀，直接返回类名加hash
                                        const hash = require('loader-utils').getHashDigest(
                                            Buffer.from(`${context.resourcePath}${localName}`),
                                            'md5',
                                            'base64',
                                            5
                                        );
                                        return `${localName}__${hash}`;
                                    }
                                }
                            };
                        }
                    }
                });
            }

            return webpackConfig;
        },
    },
};
