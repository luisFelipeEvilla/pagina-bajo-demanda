import React from "react";

function MemoryRepresentation(props) {
    return (
        <div className='representation-container'>
            <h3>Representación de la memoria principal</h3>
            <div className='memory-container' style={{ height: 400 + 'px', width: 80 + 'px' }}>
                {
                    props.totalFrames.map((frame, index) => (
                        index < props.frames.length ?
                            <div className='frame' style={{ height: 400 / props.totalFrames.length + 'px', width: 80 + 'px', backgroundColor: props.frames[index] != "x" ? "red" : "none" }}>{props.frames[index] != "x" ? props.frames[index] : ""}</div>
                            : <div className='frame frame-so' style={{ height: 400 / props.totalFrames.length + 'px', width: 80 + 'px' }}>{index} </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MemoryRepresentation;