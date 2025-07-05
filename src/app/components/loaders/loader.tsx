import React from 'react'
import './loader.css'

const Loader = () => {

    return (
        <div className="loader-overlay">
            <div className="loader">
                <span className="loader-text">Uploading</span>
                <span className="load"></span>
            </div>
        </div>
    )
}

export default Loader;
