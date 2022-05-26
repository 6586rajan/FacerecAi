import React from "react";
import './Navigation.css';
const Navigation = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){
        return(
            <nav>
                {/* <button className="f3 link dim white underline pa3 pointer">Sign Out</button> */}
                <button onClick={() => onRouteChange('signout')} className="btn flash-slide flash-slide--green pointer"> Sign Out </button>
            </nav>
    
        );
    } 
    else {
        return(
            <div>
                <nav>
                    {/* <button className="f3 link dim white underline pa3 pointer">Sign Out</button> */}
                    <button onClick={() => onRouteChange('signin')} className="btn flash-slide flash-slide--green pointer"> SignIn </button>
                    <button onClick={() => onRouteChange('register')} className="btn flash-slide flash-slide--green pointer"> Register </button>
                </nav>
            </div>
        );
    }
}

export default Navigation;