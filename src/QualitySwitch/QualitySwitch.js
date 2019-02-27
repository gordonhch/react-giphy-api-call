import React from 'react';
import './QualitySwitch.css';

const QualitySwitch = (props) => {
    return (
        <div className="fixed right-0 top-2 white ph4 pv3 bg-dark-gray" id="QualitySwitch">
            <Switches loadingMode={props.loadingMode} handleSetState={props.handleSetState}/>
        </div>
    )
}
const Switches = (props) => {
    const buttons = ['Quality', 'Speed', 'Freeze', 'Webp'];
    const style = 'pa2 br0 bw0';
    const styleSelected = 'pa2 br0 bw0 bg-silver';
    let styleSelector;
    return (
        buttons.map((name, index) => {
            
            (props.loadingMode === name) ? 
                styleSelector = styleSelected : styleSelector = style;
            return (
                <label
                    key={index}>
                    <button className={styleSelector} onClick={()=>props.handleSetState({loadingMode: name})}>
                        {name}
                        </button>
                </label>
            )
        })
    )
}
export default QualitySwitch;