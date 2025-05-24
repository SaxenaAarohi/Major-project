import { configureStore } from "@reduxjs/toolkit";
import appreducer from './slices/Appslice'
import themereducer from './slices/Themeslice'
const store = configureStore({

    reducer: {
        app: appreducer,
        theme: themereducer,
    },

})

export default store;