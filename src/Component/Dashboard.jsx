import { useDispatch, useSelector } from 'react-redux'
import Addcolumn from './Addcolumn'
import DisplayColumn from './DisplayColumn';
import { DragDropContext } from '@hello-pangea/dnd';
import { handledrop } from '../slices/Appslice';

const Dashboard = () => {

     const mode = useSelector(store => store.theme.mode); 
    const columns = useSelector(store => store.app.columns)
    const keys = Object.keys(columns);
    const dispatch = useDispatch();

    const handledropitem = (result) => {
        dispatch(handledrop(result))
    }

    return (
        <div className={`flex overflow-x-auto h-screen ${mode==='dark' ? 'bg-black' : ''} gap-2 md:gap-8 `}>
            <DragDropContext onDragEnd={handledropitem}>
                {
                    keys.map((item) => {
                        return (
                            <DisplayColumn colkey={item} key={item} />
                        )
                    })
                }
            </DragDropContext>


            <Addcolumn />

        </div>
    )
}

export default Dashboard
