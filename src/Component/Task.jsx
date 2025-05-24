import React from 'react'

const Task = ({colobj,column}) => {
  
  return (
    <div className="w-full px-2">
      {
        colobj?.[column]?.map((task, index) => (
          <div key={index} className='h-20 w-full bg-blue-400 p-2 mb-2 rounded shadow'>
            <h3 className="font-bold text-white">{task.title}</h3>
            <p className="text-white text-sm">{task.description}</p>
          </div>
        ))
      }
    </div>
  );
}

export default Task
