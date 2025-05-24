import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addtask } from '../slices/Appslice';

const Taskmodal = ({ onclose, isediting }) => {

    const [inp, setInp] = useState("");
    const [des, setDes] = useState("");
    const dispatch = useDispatch();
    const allitems = useSelector(store => store.app.columns);
    const keys = Object.keys(allitems);
    const [taskexist, settaskexist] = useState(false);

    const [col, setCol] = useState(keys[0]);
    const [isdiable, setdisable] = useState(true);

    const handleaddtask = () => {
        if (inp == "") return;

        dispatch(addtask({ inp, des, col }))
        onclose();
    }

    useEffect(() => {
        if (inp != "")
            setdisable(false);
    }, [inp])

    useEffect(() => {
    const val=allitems[col];
    settaskexist(val.some(i => i.inp.toLowerCase() == inp.trim().toLowerCase()));
    }, [col,inp])


    return (
        <div className='bg-white w-72 h-72 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg flex flex-col gap-4 p-4'>

            <div className='flex justify-end'>
                <button onClick={onclose} className='text-gray-500 hover:text-red-500 text-sm font-bold'>
                    ✕
                </button>
            </div>

            <input
                className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type='text'
                onChange={(e) => setInp(e.target.value)}
                placeholder='Add task'
            />

            <input
                className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                type='text'
                onChange={(e) => setDes(e.target.value)}
                placeholder='Add des'
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
                onClick={() => handleaddtask(inp)}
                className='bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed py-2 px-4 rounded-lg hover:bg-blue-600'
                disabled={isdiable || taskexist}
            >
                Add
            </button>
        </div>
    )

}

export default Taskmodal
