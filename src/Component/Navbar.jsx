import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../slices/Themeslice'; 
import Taskmodal from './Taskmodal';

const Navbar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(store => store.theme.mode); 

  const [showModal, setShowModal] = useState(false);
  const col = useSelector(store => store.app.columns);
  const [isempty, setIsempty] = useState(false);

  useEffect(() => {
    setIsempty(Object.keys(col).length === 0);
  }, [col]);

  function handletaskmodal() {
    if (isempty) return;
    setShowModal(true);
  }

  function handleclose() {
    setShowModal(false);
  }

  // Optional: apply class to <html> for Tailwind dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  return (
    <nav className="flex items-center justify-between px-6 py-1 bg-white shadow-sm dark:bg-gray-800">
      <div className="flex items-center space-x-3">
        <img src="https://static-00.iconduck.com/assets.00/three-vertical-lines-icon-512x512-jmfm47ki.png" alt="Kanban Logo" className="w-5 h-5" />
        <span className="text-xl font-semibold text-gray-900 dark:text-white">kanban</span>
      </div>

      <div className="flex items-center space-x-4">

        {/* 🌙 Theme Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-1">
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`w-6 h-5 rounded-full ${mode === 'light' ? 'bg-white' : 'bg-transparent'}`}
          ></button>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`w-6 h-5 rounded-full ${mode === 'dark' ? 'bg-white' : 'bg-transparent'}`}
          ></button>
        </div>

        <button
          onClick={handletaskmodal}
          className="px-4 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={isempty}>
          + Add New task
        </button>
        {showModal && <Taskmodal onclose={handleclose} />}
      </div>
    </nav>
  );
};

export default Navbar;
