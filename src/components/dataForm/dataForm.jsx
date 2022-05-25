import React from "react";

function DataForm(props) {
    return (
        <div className='form-container'>
            <form>
                <div className='form-group'>
                    <label htmlFor="frameSize">Tamaño del marco</label>
                    <input id="frameSize" type="number" name='frameSize' placeholder='Ingrese el tamaño del marco'></input>
                </div>
                <div className='form-group'>
                    <label htmlFor="SOSize">Tamaño del sistema operativo</label>
                    <input id="SOSize" type="number" name='SOSize' placeholder='Ingrese el tamaño del Sistema operativo'></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='processSize'>Tamaño del proceso</label>
                    <input id="processSize" type="number" name='processSize' placeholder='Ingrese el tamaño del proceso'></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='diskSize'>Tamaño del disco</label>
                    <input id="diskSize" type="number" name='diskSize' placeholder='Ingrese el tamaño del disco'></input>
                </div>
                <div className='form-group'>
                    <label htmlFor="directions">Direcciones del proceso</label>
                    <input id="directions" name="directions" onChange={(e) => props.showFile(e)} type="file" placeholder='Direcciones del proceso' />
                </div>
                <div className='form-group'>
                    <label htmlFor="framesNumber">Número de marcos</label>
                    <input id="framesNumber" name="framesNumber" type="number" placeholder='Ingrese el número de marcos' />
                </div>
                <div className='form-group submit-container'>
                    <button className='btn btn-large btn-success' onClick={props.handleClick} type='button'>Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default DataForm