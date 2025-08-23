import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";

const filePath = path.resolve("src", "files", process.env.FILENAME);

const readFromFile = async filePath => {
    try {
        const text = await fs.readFile(filePath);
        return text.toString();
    }
    catch (error) {
        throw error;
    }
}

console.log(await readFromFile(filePath));