module.exports = {
    paths: {
        public: 'public',
        watched: ['vendor', 'src']
    },
    files: {
        stylesheets: {
            joinTo: {
                'css/app.css': /^src/
            }
        },
        javascripts: {
            joinTo: {
                'js/app.js': /^src/,
                'js/vendor.js': /^node_modules/
            }
        }
    },
    plugins: {
        babel: {
            presets: ['es2015']
        }
    },
    npm: {
        globals: {
            PIXI: 'phaser/build/custom/pixi',
            p2: 'phaser/build/custom/p2',
            Phaser: 'phaser/build/custom/phaser-split'
        }
    }
}
