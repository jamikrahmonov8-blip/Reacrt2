import { createSlice } from "@reduxjs/toolkit"

export type User = {
    id: number
    name: string
    status: boolean
}

type TodoState = {
    data: User[]
    filteredData: User[]
}

const initialState: TodoState = {
    data: [
          { id: 1, name: "Ali", status: true },
  { id: 2, name: "John", status: false },
  { id: 3, name: "Sara", status: true },
  { id: 4, name: "Michael", status: true },
  { id: 5, name: "Zarina", status: false },
  { id: 6, name: "David", status: true },
  { id: 7, name: "Amina", status: false },
  { id: 8, name: "Alex", status: true },
  { id: 9, name: "Sophia", status: true },
  { id: 10, name: "Islom", status: false },
    ],
    filteredData: [
{ id: 1, name: "Ali", status: true },
  { id: 2, name: "John", status: false },
  { id: 3, name: "Sara", status: true },
  { id: 4, name: "Michael", status: true },
  { id: 5, name: "Zarina", status: false },
  { id: 6, name: "David", status: true },
  { id: 7, name: "Amina", status: false },
  { id: 8, name: "Alex", status: true },
  { id: 9, name: "Sophia", status: true },
  { id: 10, name: "Islom", status: false },
    ]
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addUser: (state, value) => {
            const newUser: User = {
                id: Date.now(),
                name: value.payload.name,
                status: true
            }
            state.data.push(newUser)
            state.filteredData = state.data
        },

        deleteUser: (state, action) => {
            state.data = state.data.filter((u) => u.id !== action.payload)
            state.filteredData = state.data
        },
        editUser: (state, action) => {
            const { id, name } = action.payload
            const user = state.data.find((u) => u.id == id)
            if (user) {
                user.name = name
            }
            state.filteredData = state.data
        },
        searchUser: (state, action) => {
            state.filteredData  = state.data.filter((el) => el.name.toLowerCase().includes(action.payload.toLowerCase()))

        }
    },
})

export const { addUser, deleteUser, editUser, searchUser } = todoSlice.actions
export default todoSlice.reducer