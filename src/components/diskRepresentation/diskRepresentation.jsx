import React from "react";

function DiskRepresentation(props) {
    return (
        <div className='representation-container' id="diskRepresentation">
            <h3>Almacenamiento en Disco</h3>
            <div className='disk-container' style={{ height: 400 + 'px', width: 80 + 'px' }}>
                {
                    props.totalPages.map((frame, index) => (
                        index < props.pages.length ?
                            <div className='page' style={{ height: 400 / props.totalPages.length + 'px', width: 80 + 'px' }}>{index}</div>
                            : <div className='page free-page' style={{ height: 400 / props.totalPages.length + 'px', width: 80 + 'px' }}></div>
                    ))
                }
            </div>
        </div>
    )
}

export default DiskRepresentation;