const path = require('path')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return h.file(path.join(__dirname, '../../frontend/build/index.html'))
    },
    options: {
      files: {
        relativeTo: path.join(__dirname, '../../', 'frontend')
      }
    }
  }
]
