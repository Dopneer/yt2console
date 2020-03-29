const puppeteer = require('puppeteer');
const style = require('ansi-styles');
const readline = require('readline');
const { Image } = require('image-js');
(async () =>
{
	browser = await puppeteer.launch({ headless: true });
	page = await browser.newPage();
	url = "https://www.youtube.com/watch?v=N6D6nL7-Ako";
	await page.goto(url);
	await page.waitFor(1000);
	await page.click('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button');
	element = await page.$('#movie_player > div.html5-video-container > video');
	await page.click('#more');
	await element.screenshot({path: "img/onload.png" });
		let image = await Image.load('img/onload.png');
		image = await image
    		image.save('resized.jpg');
	let img = new Array(image.height);
	for (x = 0; x < img.length; x++)
	{
  		img[x] = new Array(image.width + 1);
	}
	while(page.url() == url)
	{
		await element.screenshot({path: "img/onload.png" });
		let image = await Image.load('img/onload.png');
		image = await image
    		.resize({ width: 683 })
	for(i = 0; i < image.height; await i++)
	{
		for(j = 0; j < image.width - 1; await j++)
		{
			img[i][j] = await style.bgColor.ansi.rgb(image.getPixelXY(j, i)[0], image.getPixelXY(j, i)[1], image.getPixelXY(j, i)[2]);
			img[i][j] += await ' ';
		}
		img[i][image.width] = '\n';
	}
	await console.clear();


	result = await String(img);
	await console.log(result);
	
	await page.waitFor(1500);
	}
	await browser.close();
})();