import React,{useState} from 'react'

export default function UpperCase(props) {
  
    // states and hooks used here
    const[text,setText] = useState("")

    const onClickHandler = () =>{
        let cString = text.toUpperCase();
        setText(cString);
        props.showAlert("Converted To UpperCase","success")
    }
    
    const ToLowerCaseHandler = () =>{
        let data = text.toLowerCase();
        setText(data);
        props.showAlert("Converted To LowerCase","success")
    }

    const onChangeHandler = (event) =>{
        setText(event.target.value);
    }
    const ClearAll = () =>{
        setText("");
        props.showAlert("All Text Deleted","success")
    }

    const CopyText = () =>{
        let text = document.getElementById("exampleFormControlTextarea1");
        text.select();
        navigator.clipboard.writeText(text.value);
    }

    const RemoveSpaces = () =>{
        let newText = text.split(/[ ]+/ );
        setText(newText.join(" "))
    }
    return (
    <>
    <div className="container">
    <h1 className={`text-${props.mode}==="light"?"dark":"light"`}>{props.heading}</h1>    
    
    <div className = "my-2">
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="10" value = {text} onChange={onChangeHandler}></textarea>
    </div>
    
    <button disabled = {text.length===0} className="btn btn-primary mx-1" onClick={onClickHandler}>Convert To UpperCase</button>
    <button disabled = {text.length===0} className="btn btn-primary mx-1" onClick={ToLowerCaseHandler}>Convert To LowerCase</button>
    <button disabled = {text.length===0} className="btn btn-primary mx-1" onClick={ClearAll}>Clear Text</button>
    <button disabled = {text.length===0} className="btn btn-primary mx-2" onClick={RemoveSpaces}>Remove Extra-Spaces</button>
    <button disabled = {text.length===0} className="btn btn-primary" onClick={CopyText}>Copy Text</button>
    </div>   

    <div className="container my-3" style={{color : props.mode === "light"?"black":"aqua"}}>
        <h3>Your Summary</h3>
        <p> {text.length > 0 ? text.split(" ").filter((ele) => {return ele.length !== 0}).length:0} words and {text.length} characters </p>
        <p> Average Time for reading this Content is {0.008 * text.split(" ").filter((ele) => {return text.length !== 0}).length} minutes </p>
        <h2>This is your Preview</h2>
        <p> {text.length > 0 ? text:"Enter something in textbox for preview"} </p>
    </div>    
    </>
  )
}

// text.length > 0? text.split(" ").length:0