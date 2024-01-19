import *  as puppeteer from 'puppeteer' 
import styles from 'ansi-styles'
import * as readline from 'readline'
import { Image } from 'image-js'

(async () =>
{
	let browser = await puppeteer.launch({ headless: true });
	let page = await browser.newPage();
	let url = "https://www.youtube.com/watch?v=mjF1rmSV1dM";
	await page.goto(url);
	await page.waitForTimeout(2000);

	await page.click('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button');

	let element = await page.$('#movie_player > div.html5-video-container > video');
	await element.screenshot({path: "onload.png" });
		let image = await Image.load('onload.png');
		image = await image
			.resize({ width: 300 })
    		image.save('resized.jpg');
	let img = new Array(image.height);
	for (let x = 0; x < img.length; x++)
	{
  		img[x] = new Array(image.width + 1);
	}

	// Main cicle

	while(page.url() == url)
	{
		await element.screenshot({path: "onload.png" });
		let image = await Image.load('onload.png');
		image = await image
    		.resize({ width: 200 })
	for(let i = 0; i < image.height; await i++)
	{
		for(let j = 0; j < image.width - 1; await j++)
		{
			img[i][j] = await styles.bgColor.ansi16m(image.getPixelXY(j, i)[0], image.getPixelXY(j, i)[1], image.getPixelXY(j, i)[2]);
			img[i][j] += await ' ';
		}
		img[i][image.width] = '\n';
	}
	await console.clear();


	let result = await String(img);
	await console.log(result);
	}

	// End of main cicle



	await browser.close();
})();