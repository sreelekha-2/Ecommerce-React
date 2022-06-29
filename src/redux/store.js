

import {configureStore} from "@reduxjs/toolkit"
import counterReducer from "./cartcounter"

export const store=configureStore({
    reducer:{
        cartcounter:counterReducer
    }
})