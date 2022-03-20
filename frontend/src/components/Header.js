import { FaRegIdCard } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import React from 'react'

const Header = ({ link, to }) => {

    //console.log(path)

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center"><FaRegIdCard />&nbsp;&nbsp;Employee Register</a>
                <ul className='d-flex list-unstyled'>

                    <li><Link to={to}>{link}</Link> </li>

                </ul>

            </div>
        </nav>
    )
}

export default Header