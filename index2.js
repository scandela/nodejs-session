const puppeteer = require('puppeteer');
const { parse } = require('json2csv');
const fs = require('fs');

const captureData = async(page, url) => {
    console.log('Capturing data for url: ', url);
    await page.waitFor(1000);
    await page.goto(url);
    await page.waitFor('.people-grid');

    const result = (await page.evaluate(async () => {
      return Array.prototype.slice.call(document.querySelectorAll('.people-grid__person'))
        .map((elem) => {
          return {
            image: elem.querySelector('.people-grid__person-image') &&
                elem.querySelector('.people-grid__person-image').style.backgroundImage &&
                elem.querySelector('.people-grid__person-image').style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1],
            name: elem.querySelector('.people-grid__name') && elem.querySelector('.people-grid__name').innerText,
            position: elem.querySelector('.people-grid__role') && elem.querySelector('.people-grid__role').innerText
          };
        });
    }));
    return result;
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const domain = 'https://www.feed.xyz';
    const url = `${domain}/about`;
    let data = await captureData(page, url);

    // Convert json to csv
    const fields = ['name', 'position', 'image'];
    const opts = { fields };
    const csv = parse(data, opts);
    console.log(csv);
    fs.writeFile('./people.csv', csv, (err, data) => { if(err) console.error(err);});

  await browser.close();
})();