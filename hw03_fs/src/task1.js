import fs from "node:fs/promises";
import path from "node:path";

async function createDir(dirPath) {
    try {
        await fs.mkdir(dirPath);
        return true;
    } catch (error) {
        if (error.code === "EEXIST") {
            return false
        }
        throw error;
    }
};

async function deleteDir(dirPath) {
    try {
        await fs.rmdir(dirPath);
        return true;
    }
    catch (error) {
        if (error.code === "ENOENT") {
            return false;
        }
        throw error;
    }
}

const dirPAth = path.resolve("src", "myFolder");
if (await createDir(dirPAth)) console.log(`Folder: ${dirPAth} was created!`);
if (await deleteDir(dirPAth)) console.log(`Folder: ${dirPAth} was removed!`);
