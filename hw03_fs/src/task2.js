import fs from "node:fs/promises";
import path from "node:path";

async function createFile(filePath, text) {
    try {
        await fs.writeFile(filePath, text);
        return true;
    } catch (error) {
        console.log("--- createFile error:", error);
        return false
    }
};

async function readFile(filePath) {
    try {
        return await fs.readFile(filePath);
    } catch (error) {
        console.log("--- readFile error:", error);
        return false
    }
};


const filePath = path.resolve("src", "info.txt");
if (await createFile(filePath, "Node.js is awesome!")) console.log(`File: ${filePath} was created!`);

console.log(`File ${filePath} has been read: ${await readFile(filePath)}`);