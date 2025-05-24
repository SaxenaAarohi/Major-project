import { useState } from 'react';
import { useSelector } from 'react-redux';
import Editmodal from './Editmodal';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Pencil } from 'lucide-react'; // Optional: using lucide-react for icon (or use emoji)

const DisplayColumn = ({ colkey }) => {
  const [wantedit, setEdit] = useState(false);
  const items = useSelector(store => store.app.columns[colkey]);
  const [selecteditem, setItem] = useState(null);
  const mode = useSelector(store => store.theme.mode); // get current theme

  function handleedit(item) {
    setItem(item);
    setEdit(true);
  }

  function handleclose() {
    setEdit(false);
  }

  return (
    <div className='ml-4'>
      <div className='w-28 md:w-52 dark:text-white font-bold pb-1 pl-2'>
        <h2>{colkey}</h2>
      </div>

      <Droppable droppableId={colkey}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='w-28 md:w-52 border border-dashed p-2'
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <Draggable
                  draggableId={item.id.toString()}
                  index={index}
                  key={item.id}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='bg-white rounded-lg shadow-lg mb-3 h-auto p-4'
                    >
                      <div className='flex justify-between items-center mb-2'>
                        <h3 className='font-semibold text-sm text-gray-800'>{item.inp}</h3>
                        <button
                          onClick={() => handleedit(item)}
                          className='bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full p-1'
                          title='Edit task'
                        >
                          <Pencil size={14} />

                        </button>
                      </div>
                      <p className='text-sm text-gray-600'>{item.des}</p>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className='h-[calc(100vh-60px)] pb-2 pl-2 border border-black border-dashed' />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {wantedit && (
        <Editmodal
          title={selecteditem.inp}
          description={selecteditem.des}
          id={selecteditem.id}
          column={colkey}
          onclose={handleclose}
        />
      )}
    </div>
  );
};

export default DisplayColumn;
