import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

let url = "http://37.27.29.18:8001/api/to-dos"

// 📥 GET
export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async () => {
    const { data } = await axios.get(url)
    return data
  }
)

// ❌ DELETE
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: number) => {
    await axios.delete(`${url}?id=${id}`)
    return id
  }
)

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload
        state.loading = false
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (t: any) => t.id !== action.payload
        )
      })
  }
})

export default todoSlice.reducer