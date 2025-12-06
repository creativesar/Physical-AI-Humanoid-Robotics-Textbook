const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'docs');

function displayFileResult(filePath, result) {
    console.log(`${result}: ${filePath}`);
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split(/\r?\n/);
        const separatorIndices = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                separatorIndices.push(i);
            }
        }

        // We expect at least 3 '---' if there is duplication (Start, End of 1st header, Start of 2nd header)
        // Actually, the structure is:
        // --- (0)
        // ...
        // --- (1)
        // ... content ...
        // --- (2) -> This is the start of the REAL file content
        // ...
        // --- (3)

        if (separatorIndices.length >= 3) {
            // Check if the content between 1 and 2 looks like duplicate content
            // Usage heuristic: if the file has > 2 separators, we assume it's the specific duplication error we found.
            // We want to keep everything starting from the 3rd separator (index 2).

            const splitIndex = separatorIndices[2];
            // Verify if there is a 4th separator shortly after?
            // If the structure is correct, there should be another `---` after the 3rd one.
            if (separatorIndices.length < 4) {
                // Maybe it's not the pattern we expect?
                // But in the example:
                // ---
                // title:..
                // ---
                // ...
                // ---
                // title:..
                // ---
                // So we expect 4 separators total for the duplicated headers case.

                // However, let's just stick to the rule: if we see a NEW frontmatter block starting in the middle of the file.
                // The 3rd separator marks the start of the new frontmatter.
            }

            const newLines = lines.slice(splitIndex);
            // The slice includes the '---' line itself.
            const newContent = newLines.join('\n');
            fs.writeFileSync(filePath, newContent, 'utf8');
            displayFileResult(filePath, "FIXED");
        } else {
            // displayFileResult(filePath, "SKIPPED");
        }

    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.mdx')) {
            processFile(fullPath);
        }
    }
}

console.log("Starting MDX cleanup...");
walkDir(rootDir);
console.log("Cleanup finished.");
