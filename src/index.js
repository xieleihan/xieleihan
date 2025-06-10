require('dotenv').config();

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const prettify = require('html-prettify');
const dayjs = require("dayjs");

const data = require('./json/data');
const getInfo = require('./api/request');

const tplPath = path.join(__dirname, './template.ejs');
const outputPath = path.join(__dirname, '../README.md');

const main = async () => {
    const updatedAt = dayjs().format('YYYY年MM月DD日 HH时mm分')

    const tplStr = fs.readFileSync(tplPath, 'utf8');

    const ipinfo = await getInfo();

    const html = ejs.render(tplStr, {
        ...data,
        ipinfo,
        updatedAt,
    });

    const prettyHtml = prettify(html);

    fs.writeFileSync(outputPath, prettyHtml);
}

main().then();
