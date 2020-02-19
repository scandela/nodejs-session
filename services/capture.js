module.exports = {
    async captureData(page, url) {
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
}