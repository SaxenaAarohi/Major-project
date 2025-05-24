import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addcolumn } from '../slices/Appslice';
import { useSelector } from 'react-redux';
const Modal = ({ onclose }) => {

    const [inp, setInp] = useState("");
    const dispatch = useDispatch();
    const allitems = useSelector(store => store.app.columns);
    const keys = Object.keys(allitems);
    const [columnexist, setcolexxist] = useState(false);

    function handleaddcolumn(inp) {
        dispatch(addcolumn(inp))
        onclose();
    }

    useEffect(() => {
        setcolexxist(keys.some(key => key.toLowerCase() == inp.trim().toLowerCase()));
    }, [inp])

    return (
        <>
            <div className='bg-white w-72 h-52 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg flex flex-col gap-7 p-4'>

                <div className='flex justify-end'>
                    <button onClick={onclose} className='text-gray-500 hover:text-red-500 text-sm font-bold'>
                        ✕
                    </button>
                </div>

                <input
                    className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type='text'
                    onChange={(e) => setInp(e.target.value)}
                    placeholder='Add Column'
                />

                <button
                    disabled={inp.trim() == "" || columnexist}
                    onClick={() => handleaddcolumn(inp)}
                    className='bg-blue-500 text-white py-2 disabled:opacity-40 disabled:cursor-not-allowed px-4 rounded-lg hover:bg-blue-600'
                >
                    Add
                </button>

            </div>
        </>
    );

}

export default Modal
