// require("ts-node/register");
import "ts-node/register";

import { migrator } from "./src/umzug.ts";
migrator.runAsCLI();
// require("./src/umzug.ts").migrator.runAsCLI();