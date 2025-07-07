require('dotenv').config();

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const prettify = require('html-prettify');
const dayjs = require("dayjs");

const data = require('./json/data');
const {getInfo, getHitokoto} = require('./api/request');

const tplPath = path.join(__dirname, './template.ejs');
const outputPath = path.join(__dirname, '../README.md');

async function retry(fn, maxAttempts = 3, delay = 10000) {
    let lastError;
    for (let i = 0; i < maxAttempts; i++) {
        try {
            return await fn();
        } catch (error) {
            console.error(`当前第 ${i + 1} 失败. 在 ${delay / 1000}s 后重试`);
            lastError = error;
            if (i < maxAttempts - 1) await new Promise(res => setTimeout(res, delay));
        }
    }
    throw lastError;
}

const main = async () => {
    const updatedAt = dayjs().format('YYYY年MM月DD日 HH时mm分')

    const tplStr = fs.readFileSync(tplPath, 'utf8');

    const ipinfo = await retry(() => getInfo(), 3, 10000);
    const hitokoto = await retry(() => getHitokoto(), 3, 10000);

    const html = ejs.render(tplStr, {
        ...data,
        ipinfo,
        updatedAt,
        hitokoto,
    });

    const prettyHtml = prettify(html);

    fs.writeFileSync(outputPath, prettyHtml);
}

main().then();
