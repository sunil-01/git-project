import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


export default function Navbar(props) {
  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
    <Link a className="navbar-brand" to="/">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        {/* <a className="nav-link disabled" href="#">{props.know_more}</a> */}
        <Link a className="navbar-brand" to="/about">{props.know_more}</Link>
      </li>
    </ul>
  </div>
  <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={props.ToggleMode} />
  <label className={`form-check-label text-${props.mode==="light"?"dark":"light"}`} htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
</div>
</nav>        
  </>
  )
}

// export default Navbar

// Assigning data-type to each prop value
Navbar.propTypes = {
  title: PropTypes.string,
  know_more: PropTypes.string,
};

//deafult value prop value
Navbar.defaultProps = {
  title: "this is default title",
  know_more:"this is default about us"
}