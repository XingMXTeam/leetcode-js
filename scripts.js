"use strict";
const fs  = require('fs')
const readline = require('readline')
const args = process.argv && process.argv.length > 2 && process.argv.slice(2);
console.log(args)
const fn = require(`./${args[0]}`);

const cases = [];


async function processLineByLine() {
  const fileStream = fs.createReadStream('./cases.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  let caseObj, count = 1;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);

    if(!line) {
      caseObj = {}
    } else {
      if(count == 1) {
        count++;
        caseObj.input = line;
      }
      else {
        caseObj.output = line;
        cases.push(caseObj);
        count = 1;
      }
    }
    console.log(cases)  
  }
}



const runCases = async () => {
  await processLineByLine();
  console.log();
  console.log();
  cases.forEach((caseItem, i) => {
    console.log(`run case ${i+1}: ${caseItem.input} - ${caseItem.output}`)
    const output = fn(JSON.parse(caseItem.input), caseItem.output);
    console.log(`result: ${JSON.stringify(output)} ${Array.isArray(output)}`)
  })
}

runCases();