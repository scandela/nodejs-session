const puppeteer = require('puppeteer');
const express = require('express');
const capture = require('./services/capture');

const app = express();

const port = '9874';

app.set('view engine', 'ejs')


app.get('/employees', async (req, res) => {
    console.log('Wait a second while we gather the data ...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const domain = 'https://www.feed.xyz';
    const url = `${domain}/about`;
    let data = await capture.captureData(page, url);
    console.log("Data:", data);

    // Add the correct domain to our employees pictures
    if(Array.isArray(data) && data.length > 0) {
        const regex = /.\//;
        data = data.map((employee) => {
            const image = employee.image.replace(regex, `${domain}/`);
            if(image) {
                employee.image = image;
            }
            return employee;
        });
    }
    console.log("Data after:", data);

    await browser.close();

    res.render('card', { employees: data });
})

app.listen(port, () => console.log(`Listening on port ${port}!`))