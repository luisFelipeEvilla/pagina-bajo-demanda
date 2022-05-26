import React from "react";

function MemoryRepresentation(props) {
    function isFrameFill(index) {
        return props.frames[index] != "x"
    }

    return (
        <div className='representation-container'>
            <h3>Memoria Principal</h3>
            <div className='memory-container' style={{ height: 400 + 'px', width: 80 + 'px' }}>
                {
                    props.totalFrames.map((frame, index) => (
                        index < props.frames.length ?
                            <div key={frame} className={isFrameFill(index) ? 'frame' : 'free-frame' } style={{ height: 400 / props.totalFrames.length + 'px', width: 80 + 'px' }}>{isFrameFill(index) ? props.frames[index] : ""}</div>
                            : <div className='frame-so' style={{ height: 400 / props.totalFrames.length + 'px', width: 80 + 'px' }}>{index} </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MemoryRepresentation;