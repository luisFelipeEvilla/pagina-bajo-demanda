import React, { useEffect, useState } from 'react';

function Home(props) {
    const [ directions, setDirections] = useState([]);
    const [ operations, setOperations ] = useState([]);
    const [ pageNumbers, setPageNumbers ] = useState([]);
    const [ frameNumbers, setFrameNumbers ] = useState(0);
    const [ framesNumbers, setFramesNumbers ] = useState([]);
    const [ fisDirs, setFisDirs] = useState([]);
    const [ swapIns, setSwapIns ] = useState([]);
    const [ start, setStart] = useState(false);
    const [ frameSize, setFrameSize] = useState(0)

    let SOSize = 0;
    let processSize = 0;

    useEffect(() => {
        const newPageNumbers = [];
        const newFramesNumbers = [];
        const newFisDirs = [];
        const newSwapIn = [];
        const frames = new Array(frameNumbers).fill(0);;
        let indexFrames = 0;

        directions.forEach(dir => {
            const page = Math.floor(dir / frameSize);
            newPageNumbers.push(page)
          
            if (!isPageOnFrames(page, frames)) {
                frames[indexFrames] = page;
                newFramesNumbers.push(indexFrames);
                newFisDirs.push(indexFrames * frameSize + (dir % frameSize))
                newSwapIn.push("x");

                indexFrames >= (frames.length - 1) ? indexFrames = 0 : indexFrames++ ;
            } else {
                const frame = getFrameNumber(page, frames);
                newFramesNumbers.push(frame);
                newFisDirs.push(frame * frameSize + (dir % frameSize));
                newSwapIn.push("");
            }
        })

        setPageNumbers(newPageNumbers);
        setFramesNumbers(newFramesNumbers);
        setFisDirs(newFisDirs);
        setSwapIns(newSwapIn)
    }, [frameNumbers])

    function isPageOnFrames(pageNumber, frames) {
        const found = frames.find(frame => frame == pageNumber)
    
        return found ? true : false
    }

    function getFrameNumber(page, frames) {
        const number = frames.findIndex(frame => frame == page)
    
        return number;
    }

    const handleClick = () => {
        setFrameSize(document.getElementById('frameSize').value);
        SOSize = document.getElementById('SOSize').value;
        processSize = document.getElementById('processSize').value;
        setDirections(document.getElementById('directions').value);
        setFrameNumbers(parseInt(document.getElementById('framesNumber').value));

        setDirections([21, 26, 25, 6, 5, 29, 4, 5, 17, 16, 24, 25, 4, 7, 21, 1, 14, 15, 21, 22]);
        setOperations(["L", "L", "E", "E", "L", "L", "L", "E", "E", "E", "E", "L", "E", "L", "E", "E", "L", "L", "E", "E"]);

        setStart(true)
    }


    return (
        <div className='form-container'>
            <form>
                <div>
                    <label htmlFor="frameSize">Tamaño del marco</label>
                    <input id="frameSize" type="number" name='frameSize' placeholder='Ingrese el tamaño del marco'></input>
                </div>
                <div>
                    <label htmlFor="SOSize">Tamaño del sistema operativo</label>
                    <input id="SOSize" type="number" name='SOSize' placeholder='Ingrese el tamaño del Sistema operativo'></input>
                </div>
                <div>
                    <label htmlFor='processSize'>Tamaño del proceso</label>
                    <input id="processSize" type="number" name='processSize' placeholder='Ingrese el tamaño del proceso'></input>
                </div>
                <div>
                    <label htmlFor="directions">Direcciones del proceso</label>
                    <input id="directions" name="directions" type="file" placeholder='Direcciones del proceso' />
                </div>
                <div>
                    <label htmlFor="framesNumber">Número de marcos</label>
                    <input id="framesNumber" name="framesNumber" type="number" placeholder='Ingrese el número de marcos' />
                </div>
                <div>
                    <button onClick={handleClick} type='button'>Enviar</button>
                </div>
            </form>

            <table>
                <thead>
                    <th>Dir Lógica</th>
                    {
                        directions.map(dir => <th>{dir}</th>)
                    }
                </thead>
                <tbody>
                    <tr>
                        <td>Lect / Escri </td>
                        {
                            operations.map(operation => <td>{operation}</td>)
                        }
                    </tr>
                    <tr>
                        <td>Núm pag</td>
                        {
                            pageNumbers.map(dir => <td>{dir}</td>)
                        }
                    </tr>
                    <tr>
                        <td>Núm Marco</td>
                        {
                            framesNumbers.map(dir => <td>{dir}</td>)
                        }
                    </tr>
                    <tr>
                        <td>Dir Fisica</td>
                        {
                            fisDirs.map(dir => <td>{dir}</td>)
                        }
                    </tr>
                    <tr>
                        <td>Swap In</td>
                        {
                            swapIns.map(dir => <td>{dir}</td>)
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Home