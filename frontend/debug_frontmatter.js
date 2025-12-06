const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const docsDir = path.join(__dirname, 'docs');

try {
    walkDir(docsDir, (filePath) => {
        if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
            const content = fs.readFileSync(filePath, 'utf8');
            try {
                matter(content);
            } catch (e) {
                console.error(`Error parsing file: ${filePath}`);
                console.error(e.message);
            }
        }
    });
    console.log('Finished scanning docs.');
} catch (e) {
    console.error('Error scanning:', e);
}
