const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    port: 8003,
    uploadPath: path.join(rootPath, 'public', 'uploads'),
    db: {
        host: 'mongodb://localhost',
        database: 'photos'
    }
};