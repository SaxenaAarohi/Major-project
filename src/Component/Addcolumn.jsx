import { useState } from "react"
import Modal from "./Modal"

const Addcolumn = () => {

    const [isopen, setIsopen] = useState(false);

    function handlemodal() {
        setIsopen(true);
    }

        function handleclose() {
        setIsopen(false);
    }

    return (
        <div>
            <div onClick={handlemodal} className='flex justify-center items-center hover:bg-slate-600 w-40 ml-4 md:w-52 bg-[linear-gradient(to_bottom,_#d4dce3,_#eef2f3)]  h-[calc(108vh-80px)]'>
               + New column
            </div>
            {isopen && <Modal onclose={handleclose}/>}
        </div>

    )
}

export default Addcolumn
