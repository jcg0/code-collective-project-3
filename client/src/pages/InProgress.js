import React from "react"; 
import workingOnIt from '../assets/images/working_on_it.png'; 

const InProgress = () => {

    return (
        <div className='bg-primary justify-center'>
            <img src={workingOnIt} ></img>
            <h2 className="text-primary-content text-center text-xl"><b>Stay tuned!</b></h2>
            <p className="text-primary-content text-center text-md">We are still working on this page. </p>
        </div>
    )
}

export default InProgress; 