import { DateTime } from "luxon";
import  moment  from "moment";

const currentDateLuxon = DateTime.now();
const currentDateMoment = moment();


console.log("DD-MM-YYYY");
console.log(`moment format: ${currentDateMoment.format("DD-MM-YYYY")}`);
console.log(`luxon format:  ${currentDateLuxon.toFormat("dd-MM-yyyy")}`);

console.log("MMM Do YY");
console.log(`moment format: ${currentDateMoment.format("MMM Do YY")}`);
console.log(`luxon format:  ${currentDateLuxon.toFormat("MMM d yy")} - ordinal("Do") format not supported by luxon`);

console.log("dddd");
console.log(`moment format: ${currentDateMoment.format("dddd")}`);
console.log(`luxon format:  ${currentDateLuxon.toFormat("cccc")}`);