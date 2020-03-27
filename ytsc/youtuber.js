const puppeteer = require('puppeteer');
const fs = require('fs');
const { Image } = require('image-js');

(async () =>
{

	browser = await puppeteer.launch();
	page = await browser.newPage();

	url = "https://www.youtube.com/watch?v=9f6sNnjxeiE";

	await page.goto(url);

	waitLoad = null;

	// Wait loading and make screenshot
	while(waitLoad == null)
	{
		try
		{
		waitLoad = await page.$('#logo');
		await page.waitFor(1000);
		}
		catch
		{
			await page.screenshot({path: "Error.png" });
			await console.log("Error");
			await browser.close();
		}
	}

	element = await page.$('#movie_player > div.html5-video-container > video');

	await page.waitFor(500)

	await page.click('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button');
	await page.click('#more');

	console.clear()

	
	let grey;

	while(page.url() == url)
	{

		await element.screenshot({path: "img/onload.png" });
		let image = await Image.load('img/onload.png');
		grey = await image
    		.grey()
    		.resize({ width: 60 })
    	grey.save('cat.png');

    	await console.log(grey.getPixelXY(0, 0)[0]);

    	let img = new Array(grey.height);
	console.clear();
	for (x = 0; x < img.length; x++)
	{
  		img[x] = new Array(grey.width);
	}


	for(i = 0; i < grey.width; await i++)
	{
		for(j = 0; j < grey.height; await j++)
		{
			await console.log(i + ' ' + j + ' ' + grey.getPixelXY(i, j))
			color = await grey.getPixelXY(i, j);
			if(color > 200)
			{
				img[j][i] = await '.';
			}
			else if(color > 150)
			{
				img[j][i] = await '/';
			}
			else if(color > 80)
			{
				img[j][i] = await '*';
			}
			else
			{
				img[j][i] = await '#';
			}
		}
	}
	console.clear();
	for(i = 0; i < grey.width; await i++)
	{
		result = String(img[i]);
		result = result.replace(',', '');
		if(result != "undefined")
		{
			console.log(result);
		}
	}
	}


	await browser.close();


})();