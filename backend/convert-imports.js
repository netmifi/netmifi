const fs = require('fs');
const path = require('path');

// Recursively process files in a directory
function processDirectory(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
            convertImportsToRequire(fullPath);
        }
    });
}

// Convert ES module imports to CommonJS
function convertImportsToRequire(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(
        /import\s+([\w\s{},*]+)\s+from\s+['"](.+?)['"];/g,
        (_, imports, source) => {
            if (imports.startsWith('* as ')) {
                // Namespace import
                const name = imports.replace('* as ', '');
                return `const ${name} = require('${source}');`;
            } else if (imports.startsWith('{')) {
                // Named imports
                return `const ${imports} = require('${source}');`;
            } else {
                // Default import
                return `const ${imports} = require('${source}');`;
            }
        }
    );

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Converted imports in ${file}`);
}

// Start processing the source directory
processDirectory('./src');
