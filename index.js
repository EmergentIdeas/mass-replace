const cheerio = require('cheerio')
const minimist = require('minimist')
const fs = require('fs')

let argv = minimist(process.argv.slice(2));

if(!argv._ || argv._.length < 1) {
	console.log(`use like: index.js <configuration-file.json>`)
	process.exit()
}

let config = JSON.parse(fs.readFileSync(argv._[0]))

let replacementInfo = fs.readFileSync(config.replacementFile).toString()
let replacementSelector = config.replacementSelector

for(let file of config.files) {
	let $ = cheerio.load(fs.readFileSync(file))
	$(replacementSelector).replaceWith(replacementInfo)
//	console.log($.html())
	fs.writeFileSync(file, $.html())
}

