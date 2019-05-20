import React from "react";

import "../assets/css/spinner.css";
const SpinnerPage = () => {

    return (

            <div className="spinner-border text-danger spinner" role="status">
                <span className="sr-only">Loading...</span>
            </div>


    );
}

export default SpinnerPage;