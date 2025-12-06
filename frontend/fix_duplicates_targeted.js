const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, 'docs');

// Only target these specific folders which showed errors
const targetedPatterns = [
    '8-gazebo-simulation',
    '9-isaac-sim-isaac-ros',
    '10-unity-robotics-digital-humans',
    '11-visual-slam-vslam',
    '12-navigation-path-planning-nav2',
    '13-humanoid-locomotion-motion-generation',
    '14-vision-language-action-robotics'
];

function displayFileResult(filePath, result) {
    console.log(`${result}: ${filePath}`);
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Safety check: Does it actually look like it has duplicate frontmatter?
        // simple check: count occurrences of "sidebar_label:" or "title:"
        const titleMatch = content.match(/^title:/gm);
        if (!titleMatch || titleMatch.length < 2) {
            // Not a duplicate file, skip it
            return;
        }

        const lines = content.split(/\r?\n/);
        const separatorIndices = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                separatorIndices.push(i);
            }
        }

        // Logic: If there are at least 3 separators, and we confirmed duplicate titles,
        // it's almost certainly the copy-paste error.
        // The pattern is:
        // --- (0)
        // ...
        // --- (1)
        // ...
        // --- (2) -> Start of kept content

        if (separatorIndices.length >= 3) {
            const splitIndex = separatorIndices[2];
            const newLines = lines.slice(splitIndex);

            // Double check: does newLines start with '---'?
            if (newLines[0].trim() !== '---') {
                console.log("SKIPPED (Unexpected format): " + filePath);
                return;
            }

            const newContent = newLines.join('\n');
            fs.writeFileSync(filePath, newContent, 'utf8');
            displayFileResult(filePath, "FIXED");
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
            // Only walk into targeted directories or subdirectories
            const dirName = path.basename(fullPath);
            const parentDir = path.basename(path.dirname(fullPath));

            // Allow if it matches target, OR if we are already inside docs root and it is a target
            // Actually simpler: just check if the path includes one of the targeted strings
            let isTargeted = false;
            for (const pattern of targetedPatterns) {
                if (fullPath.includes(pattern)) {
                    isTargeted = true;
                    break;
                }
            }

            if (isTargeted) {
                walkDir(fullPath);
            }
        } else if (file.endsWith('.mdx')) {
            processFile(fullPath);
        }
    }
}

console.log("Starting targeted MDX cleanup...");
walkDir(rootDir);
console.log("Cleanup finished.");
