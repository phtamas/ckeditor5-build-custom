const path = require( 'path' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
    entry: path.resolve( __dirname, 'src', 'ckeditor.js' ),

    output: {
        library: 'ClassicEditor',
        path: path.resolve( __dirname, 'build' ),
        filename: 'ckeditor.js',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },

    optimization: {
        minimizer: [
            new TerserPlugin( {
                sourceMap: true,
                terserOptions: {
                    output: {
                        // Preserve CKEditor 5 license comments.
                        comments: /^!/
                    }
                },
                extractComments: false
            } )
        ]
    },

    plugins: [
        new CKEditorWebpackPlugin( {
            language: 'hu'
        } )
    ],

    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig( {
                            themeImporter: {
                                themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                            },
                            minify: true
                        } )
                    },
                ]
            }
        ]
    }
};