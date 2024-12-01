const fs = require('fs');
const path = require('path');

module.exports = function (folderPath, options) {
    const themePath = path.join(__dirname, '..', folderPath);
    try {
        const files = fs.readdirSync(themePath);
        return files
            .filter(file => /\.(png|jpg|jpeg|svg|gif)$/.test(file)) // Only images
            .map(file => {
                const fullPath = path.join(folderPath, file);
                return options.fn({ src: fullPath, name: path.basename(file, path.extname(file)) });
            })
            .join('');
    } catch (error) {
        console.error(`Error reading folder: ${themePath}`, error);
        return '';
    }
};
