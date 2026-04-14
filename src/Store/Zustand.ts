import { create } from "zustand"

export type User = {
  id: number
  name: string
  status: boolean
}

type Store = {
  data: User[]
  filteredData: User[]

  addUser: (name: string) => void
  deleteUser: (id: number) => void
  editUser: (id: number, name: string) => void
  searchUser: (value: string) => void
  resetSearch: () => void
}

const initialUsers: User[] = [
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

export const useTodoStore = create<Store>((set, get) => ({
  data: initialUsers,
  filteredData: initialUsers,

  // ➕ ADD
  addUser: (name) =>
    set((state) => {
      const newUser: User = {
        id: Date.now(),
        name,
        status: true,
      }

      const updated = [...state.data, newUser]

      return {
        data: updated,
        filteredData: updated,
      }
    }),

  // ❌ DELETE
  deleteUser: (id) =>
    set((state) => {
      const updated = state.data.filter((u) => u.id !== id)

      return {
        data: updated,
        filteredData: updated,
      }
    }),

  // ✏️ EDIT
  editUser: (id, name) =>
    set((state) => {
      const updated = state.data.map((u) =>
        u.id === id ? { ...u, name } : u
      )

      return {
        data: updated,
        filteredData: updated,
      }
    }),

  // 🔍 SEARCH
  searchUser: (value) =>
    set((state) => {
      const v = value.toLowerCase()

      if (!v) {
        return { filteredData: state.data }
      }

      return {
        filteredData: state.data.filter((el) =>
          el.name.toLowerCase().includes(v)
        ),
      }
    }),

  // 🔄 RESET SEARCH
  resetSearch: () =>
    set((state) => ({
      filteredData: state.data,
    })),
}))