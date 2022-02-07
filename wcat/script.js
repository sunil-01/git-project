#!/usr/bin/env node

const fs = require("fs");

let arguments = process.argv.slice(2);  // cmd me 2nd inedx se baad ka sara content argument me store karenge till end tak
let flags = []; // flags basically command hota hai eg-: -r,-w ,etc
let filenames = []; // filenmae sare files ka naam store karega
let specialcharacter = [];


for(i of arguments){  // argument array ke saare value extract kar lega
    if(i[0]=="-"){  // multiple flag ho sakte hai isliye usko array me store kar diya sare value ka 0th index check kiya ki usme "-" hai ya nhi
        flags.push(i);
    }
    else if(i[0]=="%"){
        specialcharacter.push(i.slice(1)); // yaha pe % ke baad jo bhi likha hoga woh specialcharacter wlae array me push ho jaega hmne slice isliye kya ki hame % ke baad wale character mile jisse hame remove karna hai
      }
    //   else if(i[0]== ""){
    //       content.push(i.slice(1));
    //   }
    else{
        filenames.push(i);
    }
}
// console.log(content)


// // if(flags.length ==0 && filenames.length !=0){
// //     for(let file of filenames){
// //         console.log(fs.readFileSync(file,"utf-8"));
// //     }
// // }
     let filedata = undefined;
     let num = 1;

    for(let file of filenames){
        for(f of flags){
            if(f !="-w"){
                filedata = fs.readFileSync(file,"utf-8");
            }
        }
       
        for(let flag of flags){
            if(flag == "-rs"){
            filedata = filedata.split(" ").join("");
            }
            if(flag == "-rn"){
                filedata = filedata.split("\r\n").join("");
            }
            if(flag == "-rsc"){
               for(let character of specialcharacter){
                 filedata = removeall(filedata,character);
                 }         
                }
                if(flag == "-w"){
                    fs.writeFileSync(file,"goodnight","utf-8")
                     }
                     if(flag == "-s"){
                         data = addsequence(filedata) // s = add numbers at start of each line
                         console.log(data)
                     }
                     if(flag == "-ns"){
                        data = addnumber(filedata) // ada no. at start of each line but only for the line that contain something
                        console.log(data)
                     }
                     if(flag == "-rel"){
                         let ans = removespace(filedata) // rel = remove all empty lines
                        for(let i =0;i<ans.length;i++){
                            console.log(ans[i]);
                        }

                     }
            }
            // console.log(filedata);
            
        }
 

function removeall(string,removedata){
    return string.split(removedata).join("");
}

function addsequence(content){
    let newcontent = content.split("\r\n")
     for(let i=0;i<newcontent.length;i++){
     newcontent[i]  = (i+1) + "." + newcontent[i]   
    }
    return newcontent
} 

function addnumber(content){
    let newcontent = content.split("\r\n")
    let count =  1;
        for(j=0;j<newcontent.length;j++){
            if(newcontent[j] != ""){
            newcontent[j] = count + "." + newcontent[j]
            count++
        }
    }
    return newcontent
}

// THIS FUNCTION PRINTS THE CONTENT WITH ONE EMPTY LINE 
function removespace(filedata){
    let contentarr = filedata.split("\r\n");
    let data = [];
    for(let i =0;i<contentarr.length;i++){
        if(contentarr[i]=="" && contentarr[i+1]==""){
            contentarr[i] = null;
        }
        if(contentarr[i]=="" && contentarr[i+1]==null){
            contentarr[i] = null; 
        }
    }
    for(let i =0;i<contentarr.length;i++){
        if(contentarr[i] != null){
            data.push(contentarr[i]);
        }
    }
    return data;
}

// THIS FUNCTION PRINTS THE LINES WITHOUT ANY EMPTY LINE

// function removespace(filedata){
//     let contentarr = filedata.split("\r\n");
//     let data = [];
//     for(let i =0;i<contentarr.length;i++){
//         if(contentarr[i] !=""){
//             data.push(contentarr[i]);
//         }
//     }
//     return data;
// }