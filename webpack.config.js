'use strict';

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, loaders } = require( '@ckeditor/ckeditor5-dev-utils' );
const { CKEditorTranslationsPlugin } = require( '@ckeditor/ckeditor5-dev-translations' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
    devtool: 'source-map',
    performance: { hints: false },

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
                        comments: /^!/
                    }
                },
                extractComments: false
            } )
        ]
    },

    plugins: [
        new CKEditorTranslationsPlugin( {
            language: 'hu'
        } ),
        new webpack.BannerPlugin( {
            banner: bundler.getLicenseBanner(),
            raw: true
        } )
    ],

    module: {
        rules: [
            loaders.getIconsLoader( { matchExtensionOnly: true } ),
            loaders.getStylesLoader( {
                themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' ),
                minify: true
            } ),
            loaders.getTypeScriptLoader()
        ]
    },

    resolve: {
        extensions: [ '.ts', '.js', '.json' ]
    }
};