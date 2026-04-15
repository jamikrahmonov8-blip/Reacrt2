<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./todo"
=======
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todo'
>>>>>>> 88e2867578e647e33e249d20315f9fa1420a0838

export const store = configureStore({
  reducer: {
    todo: todoReducer
<<<<<<< HEAD
  }
=======
  },
>>>>>>> 88e2867578e647e33e249d20315f9fa1420a0838
})