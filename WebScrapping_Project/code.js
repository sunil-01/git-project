let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
let id = "ipl-2020-21-1210595";


request("https://www.espncricinfo.com/series/" + id + "/match-results", cb);

let links = []
let count = 0;
function cb(err, res, html) {
    let $ = cheerio.load(html);
    let allmatchlinkanchortag = $("a[data-hover=Scorecard]")
    for (let i = allmatchlinkanchortag.length-1; i >= 55; i--) {
        let match_links = $(allmatchlinkanchortag[i]).attr("href")
        let eachlink = "https://www.espncricinfo.com/" + match_links;
        links.push({
            url : eachlink,
            bat1st : [],
            bow1st : [],
            bat2nd : [],
            bow2nd : []
        })
        request(eachlink, matchpage.bind(this, count, allmatchlinkanchortag)); // match no.
        count++
    }

}

let link_count= 0

function matchpage(match_no, match_anchor_tag, err, res, html) {
    link_count++;
    let $ = cheerio.load(html);
    let batsman_tables = $(".table.batsman")
    let bowler_tables = $(".table.bowler")
    let match_link = $(match_anchor_tag[match_no]).attr("href")
    let full_link = "https://www.espncricinfo.com/" + match_link
    
    for (let i = 0; i < batsman_tables.length; i++) {
        if (i == 0) {
            let each_batsman_table = $(batsman_tables[0]);
            let each_bowler_table = $(bowler_tables[0]);
            request(full_link, batbowl1.bind(this, each_batsman_table, each_bowler_table, i, match_no))
        }
        else if(i==1) {
            let each_batsman_table = $(batsman_tables[1]);
            let each_bowler_table = $(bowler_tables[1]);
            request(full_link, batbowl2.bind(this, each_batsman_table, each_bowler_table, i, match_no))
        }
    }
}

let bat_one_count = 0;
let bat_loop_count = 0;
let bow_loop_count = 0;

function batbowl1(element, element1, table_no, file_no, err, res, html) {
    bat_one_count++;
    let $ = cheerio.load(html)
    let data = $(element).find("tbody>tr")
    if (table_no == 0 && data.length != 0) {
        let array = []
        bat_loop_count++;
        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                let table_data = $(data[i]).find("td");
            
                if (i != data.length - 1) {
                    links[file_no].bat1st.push({
                        name: $(table_data[0]).text(),
                        fallOfWicket: $(table_data[1]).text(),
                        Run: $(table_data[2]).text(),
                        Ball: $(table_data[3]).text(),
                        Four: $(table_data[5]).text(),
                        Six: $(table_data[6]).text(),
                        SR: $(table_data[7]).text()
                    })
                }
                else {
                    links[file_no].bat1st.push({
                        Extras: $(table_data[1]).text() + " " + $(table_data[2]).text()
                    })
                }
            }
        }
        let Team_Total1 = $(element).find("tfoot>tr")
        let team1_Row = $(Team_Total1[0]).find("td")
        links[file_no].bat1st.push({
            Total: $(team1_Row[2]).text() + "   " + $(team1_Row[1]).text()
        })
    }

    let data1 = $(element1).find("tbody>tr")

    if (table_no == 0 && data1.length != 0) {
        let bow1 = []
        bow_loop_count++
        for (let i = 0; i < data1.length; i++) {
            let table_data = $(data1[i]).find("td");
            if (table_data.length > 1) {
                links[file_no].bow1st.push({
                    name: $(table_data[0]).text(),
                    over: $(table_data[1]).text(),
                    maiden: $(table_data[2]).text(),
                    Run: $(table_data[3]).text(),
                    Wicket: $(table_data[4]).text(),
                    Econ: $(table_data[5]).text(),
                    "0's": $(table_data[6]).text(),
                    "4's": $(table_data[7]).text(),
                    "6's": $(table_data[8]).text(),
                    wo: $(table_data[9]).text(),
                    nb: $(table_data[10]).text()
                })
            }
            
        }
    }
}

let bat_two_count = 0;
let bat_two_loop_count = 0;
let bow_two_loop_count = 0;

function batbowl2(element, element1, table_no, file_no, err, res, html) {
    bat_two_count++;
    let $ = cheerio.load(html)
    let data = $(element).find("tbody>tr")
    if (table_no == 1 && data.length != 0) {
        let array1 = []
        bat_two_loop_count++;
        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                let table_data = $(data[i]).find("td");
                   if (i != data.length - 1) {
                    links[file_no].bat2nd.push({
                        name: $(table_data[0]).text(),
                        fallOfWicket: $(table_data[1]).text(),
                        Run: $(table_data[2]).text(),
                        Ball: $(table_data[3]).text(),
                        Four: $(table_data[5]).text(),
                        Six: $(table_data[6]).text(),
                        SR: $(table_data[7]).text()
                    })
            }
                else {
                    links[file_no].bat2nd.push({
                        Extras: $(table_data[1]).text() + " " + $(table_data[2]).text()
                    })
                }
            }
        }
        let Team_Total2 = $(element).find("tfoot>tr")
        let Row = $(Team_Total2[0]).find("td")
        links[file_no].bat2nd.push({
            Total: $(Row[2]).text() + "     " + $(Row[1]).text()
        })
    }
   
    let data1 = $(element1).find("tbody>tr")
    
    if (table_no == 1 && data1.length != 0) {
        let bow2 = []
        bow_two_loop_count++
        for (let i = 0; i < data1.length; i++) {
            let table_data = $(data1[i]).find("td");
            if (table_data.length > 1) {
                links[file_no].bow2nd.push({
                    name: $(table_data[0]).text(),
                    over: $(table_data[1]).text(),
                    maiden: $(table_data[2]).text(),
                    Run: $(table_data[3]).text(),
                    Wicket: $(table_data[4]).text(),
                    Econ: $(table_data[5]).text(),
                    "0's": $(table_data[6]).text(),
                    "4's": $(table_data[7]).text(),
                    "6's": $(table_data[8]).text(),
                    wo: $(table_data[9]).text(),
                    nb: $(table_data[10]).text()
                })
            }
            
        }
    }
    if(bat_one_count == count && count== bat_two_count && bat_loop_count == bat_two_loop_count && bow_loop_count == bow_two_loop_count){
    
        fs.writeFileSync("Complete_Series_Data.json",JSON.stringify(links))
        
        Create_id_For_Files()
    }    

}    


function Create_id_For_Files(){
    let file_data = fs.readFileSync("./Complete_Series_Data.json","utf-8")
    let Match_id = [];

    let parsed_data = JSON.parse(file_data);
    let Match_link_arr=[]
    for(let i = 0;i<parsed_data.length;i++){
       let link = parsed_data[i].url;
       Match_link_arr.push(link)
    }

    for(let i =0;i<Match_link_arr.length;i++){
        let full_link = Match_link_arr[i];
        let split1_arr = full_link.split("-");
     
        for(let i = 9;i < split1_arr.length;i++){
           let potential_id = split1_arr[i];
            if(potential_id[0]==1 && potential_id[1]==2 && potential_id[2]==3 || potential_id[2]==1){
              let split2_arr = potential_id.split("/")
              Match_id.push(split2_arr[0])
            }
        }
    }        
    
    Create_seperate_File_For_Each_Inngs(Match_id)
}

function Create_seperate_File_For_Each_Inngs(Match_id){
   
    if(fs.existsSync("./Match_ScoreCard_Data")==false){
       fs.mkdirSync("./Match_ScoreCard_Data")
    }
    
    let File_data = fs.readFileSync("./Complete_Series_Data.json","utf-8")
    Parsed_data = JSON.parse(File_data);
    
    for(let i =0;i<Parsed_data.length;i++){
        let file_data = Parsed_data[i].bat1st;
        fs.writeFileSync("./Match_ScoreCard_Data" + "/" + Match_id[i] +"-1st-InngBat.json",JSON.stringify(file_data));
        
        let file_data1 = Parsed_data[i].bow1st;
        fs.writeFileSync("./Match_ScoreCard_Data" + "/" + Match_id[i] +"-1st-InngBow.json",JSON.stringify(file_data1));
            
        let file_data2 = Parsed_data[i].bat2nd;
        fs.writeFileSync("./Match_ScoreCard_Data" + "/" + Match_id[i] +"-2nd-InngBat.json",JSON.stringify(file_data2));
        
        let file_data4 = Parsed_data[i].bow2nd;
        fs.writeFileSync("./Match_ScoreCard_Data" + "/" + Match_id[i] +"-2nd-InngBow.json",JSON.stringify(file_data4));
        
    }
        Json_To_Excel_Converter();
}

function Json_To_Excel_Converter(){
    let path = "./Match_ScoreCard_Data"
    let arr_Files = fs.readdirSync(path)
    let new_arr = arr_Files.join("");
    let name_of_xl_sheets = new_arr.split(".json");

    const wb = xlsx.utils.book_new()
    for (let i = 0; i < arr_Files.length; i++) {
        let file_data = fs.readFileSync(path + "/" + arr_Files[i], "utf-8")
        let convert_To_Object = JSON.parse(file_data);

        const ws = xlsx.utils.json_to_sheet(convert_To_Object)

        xlsx.utils.book_append_sheet(wb, ws, name_of_xl_sheets[i]);

        xlsx.writeFile(wb, "Complete_Series_Data.xlsx")
    }
}






