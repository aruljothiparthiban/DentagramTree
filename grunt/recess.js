module.exports = {
	less: {
        files: {
          'app/public/src/css/app.css': [
            'app/public/src/css/less/app.less'
          ],
          'app/public/src/css/md.css': [
            'app/public/src/css/less/md.less'
          ]
        },
        options: {
          compile: true
        }
    },
    admin: {
        files: {
            'app/public/admin/css/app.min.css': [
                'app/public/libs/jquery/bootstrap/dist/css/bootstrap.css',
                'app/public/src/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    },
    html: {
        files: {
            'html/css/app.min.css': [
                'libs/jquery/bootstrap/dist/css/bootstrap.css',
                'src/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    }
}
