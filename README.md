WEB-SCRAPPING

usages -: JavaScript,Node.js,FS module(file system),Cheerio module,xlsx module,css selectors,request module

worked with -:Asynchronous functions,synchronous functions,file-system,excel library,request module to request web-page,cheerio to select html elements,making async behave like sync

This is an Data Extarctor project made completely with javascript and NODE.js using callbacks,asynchronus and synchronous function.Making asynchronus function work in a synchronous manner to get the desired output.

I have worked with many of the css selectors to extract data from html.By doing this i can say i have a strong hold on css selectors.

I have used an inbuilt node module named cheerio to load and extract html from the web-pages and obtain our data.

What does the project do?

This project takes series-id or match-id from the user and extract all the data of each match in four json file. 
Each Json file contains 1 innings with batting or bowling
The files are listed in a synchronus manner i.e(Starting from the first match till the last every match is stored by the name of their match-id) and the data files are setted sequencly
The extracted data is converted into json file and all are stored in Match_ScoreCard_Data folder.
Now with the help of inbuilt excel module named "xlsx".I have converted all the data present in the Match_ScoreCard_Data folder into an single excel file with 4 sheets for each match,hence creating multiple sheets
After that i have converted the excel file into csv file which can we used by various data engineers to analyze,identify, gain knowledge from that data.
