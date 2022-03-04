import React from 'react'

export default function Alert(props) {
 
  const Capitalize = (word) =>{
    if(word === "undefined"){
      return "welcome"
    }
    let fl = word.charAt(0);
    return fl.toUpperCase() + word.slice(1);
  }

  return(  
    <>
       <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong> {Capitalize(props.alert.type + "")} </strong> :{props.alert.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      
    </>
  )
}
