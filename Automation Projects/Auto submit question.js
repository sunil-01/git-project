const puppy = require("puppeteer");
const id = "sunilpanigrahicr7@gmail.com";
const password = "RohitMan@45";
async function main() {
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });
    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1",id);
    await tab.type("#input-2",password);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    
    await tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled", {visible: true});
    await tab.click(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    
    await tab.waitForSelector('[data-attr2="one-week-preparation-kit"]', {visible: true})
    let problems = await tab.$$('[data-attr2="one-week-preparation-kit"]');
    let problemUrls = [];
    for(let i = 0; i < problems.length; i++) {
        let url = await tab.evaluate(function(ele) {
            return ele.getAttribute("href");
        }, problems[i]);
        problemUrls.push(url);
    }

    for(let i = 0; i < problemUrls.length; i++) {
        await solveChallenge("https://www.hackerrank.com" + problemUrls[i],tab);
    }
    await browser.close();
}

async function solveChallenge(url,tab) {
    let problemUrl = url.replace("?", "/problem?");
    let editorialUrl = url.replace("?", "/editorial?");
    await tab.goto(editorialUrl);
    let languages = await tab.$$(".hackdown-content h3");
    for(let i = 0; i < languages.length; i++) {
        let languageName = await tab.evaluate(function(ele) {
            return ele.innerText;
        }, languages[i]);
        if(languageName == "C++") {
            let codes = await tab.$$(".hackdown-content .highlight");
            let code = await tab.evaluate(function(ele) {
                return ele.innerText;
            }, codes[i]);
            await tab.goto(problemUrl);
            await tab.waitForSelector(".checkbox-input", {visible: true});
            await tab.click(".checkbox-input");
            await tab.type("#input-1", code);
            await tab.keyboard.down("Control");
            await tab.keyboard.press("A");
            await tab.keyboard.press("X");
            await tab.click(".monaco-scrollable-element.editor-scrollable.vs");
            await tab.keyboard.press("A");
            await tab.keyboard.press("V");
            await tab.keyboard.up("Control");
            await tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
            await tab.waitForSelector(".congrats-heading", {visible: true});
            return;
        }
    }
}
main()
