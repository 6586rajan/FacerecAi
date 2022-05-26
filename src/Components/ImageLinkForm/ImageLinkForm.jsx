import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onImageSubmit}) => {
    return (
        <div>
            <p className="f3 white">
                {'Recognizes and bounds any faces detected in a given image'}
            </p>
            <div className="myCenter">
                <div className="myCenter form pa4 br3 shadow-5">
                    <input className=" f4 pa2 w-70 center" type="url" onChange={onInputChange}/>
                    {/* <button className="w-30 grow f4 link ph3 pv2 dib white">Detect</button> */}
                    <button className="w-31 btn btn-moving-gradient btn-moving-gradient--blue" 
                    onClick={onImageSubmit}>
                        Detect</button>
                </div>
            </div>

        </div>
    );
}

export default ImageLinkForm;