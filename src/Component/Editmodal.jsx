import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { edittask } from '../slices/Appslice';

const Editmodal = ({ title, description, id,column, onclose }) => {

    const [inp, setInp] = useState(title);
    const [des, setDes] = useState(description);
    const dispatch = useDispatch();
    const allitems = useSelector(store => store.app.columns);
    const keys = Object.keys(allitems);
    const [col, setCol] = useState(column);

    const handleedit = () => {
        if (inp == "") return;
        dispatch(edittask({
            prevcol:column,
            col,
            task: {
               inp,
                des,
                id,
            }
        }

        ));
        onclose();
    }

    return (
        <div className='bg-white w-72 h-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg flex flex-col gap-4 p-2'>

            <div className='flex justify-end'>
                <button onClick={onclose} className='text-gray-500 hover:text-red-500 text-sm font-bold'>
                    ✕
                </button>
            </div>

            <input
                className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type='text'
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                placeholder='Edit task'
            />

            <input
                className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type='text'
                value={des}
                onChange={(e) => setDes(e.target.value)}
                placeholder='Edit des'
                required
            />
            <select value={col} onChange={(e) => setCol(e.target.value)}
                className="border p-2 rounded-md"
            >
                {keys.map((item) => {
                    return (
                        <option value={item}>{item}</option>
                    )

                })}

            </select>

            <button
                onClick={() => handleedit(inp)}
                className='bg-blue-500 text-white  py-2 px-4 rounded-lg hover:bg-blue-600'
            >
                Edit
            </button>
        </div>
    )
}

export default Editmodal
