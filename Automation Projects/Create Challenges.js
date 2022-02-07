// node activity1.js --url=https://www.hackerrank.com --config=config.json --totalchallenge=20

const minimist = require("minimist");
const puppy = require("puppeteer");
const fs = require("fs");

let args = minimist(process.argv);
// console.log(args.url);

let config = fs.readFileSync(args.config,"utf-8");
let configKaJson = JSON.parse(config);
// console.log(configKaJson.moderator[0])

async function openbrowser() {
    const browser = await puppy.launch({
      headless: false,
      defaultViewport: false,
      args: [
        '--start-maximized' // you can also use '--start-fullscreen'
      ],
    })
    let all_Tabs = await browser.pages();
    let Tab = await all_Tabs[0]
    
  await Tab.goto(args.url)
  
  await Tab.waitForSelector('[data-event-action="Login"]');
  let fisrt_page_login_btn = await Tab.$('[data-event-action="Login"]');
  await fisrt_page_login_btn.click(); 
  
  await Tab.waitForSelector('[href="https://www.hackerrank.com/login"]');
  let second_login_page = await Tab.$('[href="https://www.hackerrank.com/login"]');
  await second_login_page.click();

  await Tab.waitForSelector("#input-1");
  let username_Tab = await Tab.$("#input-1");
  await username_Tab.type(configKaJson.Email);

  let password_Tab = await Tab.$("#input-2");
  await password_Tab.type(configKaJson.password)

  let Remember_Tab = await Tab.$(".checkbox-wrap")
  await Remember_Tab.click()

  let Login_Button = await Tab.$("[data-analytics=LoginPassword]")
  await Login_Button.click()    

  await Tab.waitForNavigation({ waitUntil: "networkidle2" });
  await Tab.waitForSelector('[data-analytics="NavBarProfileDropDown"]', {
    visible: true,
  });
  let Profile_Button = await Tab.$("[data-analytics=NavBarProfileDropDown]")
  await Profile_Button.click();

  await Tab.waitForSelector("[data-analytics=NavBarProfileDropDownAdministration]")
  let Adminstrator_option = await Tab.$("[data-analytics=NavBarProfileDropDownAdministration]")
  await Adminstrator_option.click();

  await Tab.waitForSelector(".admin-tabbed-nav a")
  let Manage_Challenge_arr = await Tab.$$(".admin-tabbed-nav a")
  let Manage_Challenge = Manage_Challenge_arr[1];
  await Manage_Challenge.click();

  total_challenge = (parseInt)(configKaJson.totalchallenge);
  
  for(let i = 1;i <= 4;i++){
    await Tab.waitFor(3000);
   //await Tab.waitForNavigation({ waitUntil: "networkidle0" })
    await create_challenge(Tab);
  
   await Tab.waitFor(6000);

  //  let url = args.url + "/" + "administration" + "/" + "challenges";
   await Tab.goto("https://www.hackerrank.com/administration/challenges/page/12") 
  }

  console.log("done success")
}    

async function create_challenge(Tab){
  await Tab.waitFor(3000);
  await Tab.waitForSelector(".btn.btn-green.backbone.pull-right") // for every new page the page loads so wait for selector to get loaded in the page
  let create_challenge_btn = await Tab.$(".btn.btn-green.backbone.pull-right") // obtain the elemrnts of these selector
  await create_challenge_btn.click();
  
  await Tab.waitForSelector("[id=name]");
  let Challenge_Name = await Tab.$("[id=name]");
  await Challenge_Name.click()
  await Challenge_Name.type("hello");
  
  let Description_tab = await Tab.$("#preview")
  Description_tab.click();
  await Description_tab.type("hello");
  
  await Tab.waitForSelector(".CodeMirror-code")
  let codeTextAreas = await Tab.$$(".CodeMirror-code");
  
  let informatTextArea = await Tab.$("#input_format-container .CodeMirror-code");
  await informatTextArea.click();
  await informatTextArea.type("kjdsbf");
  
  await Tab.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });
    for (let i in codeTextAreas) {
      await codeTextAreas[i].click();
      await codeTextAreas[i].type("kjdsbf");
    }
  await Tab.waitForSelector("#tags_tagsinput");
  let tagsTextArea = await Tab.$("#tags_tagsinput");
  await tagsTextArea.click();
  await tagsTextArea.type("kjdsbf");
  await Tab.keyboard.press("Enter");
  
  let save_change_btn = await Tab.$(".save-challenge.btn.btn-green");
  await save_change_btn.click()
  
  let saveChangesButton = await Tab.$(".save-challenge.btn.btn-green");
  await saveChangesButton.click();
  await Tab.waitFor(1000);

  await saveChangesButton.click();
  
  // let url = args.url + "/" + "administration" + "/" + "challenges";
  await Tab.goto("https://www.hackerrank.com/administration/challenges/page/12") 
}

openbrowser()
