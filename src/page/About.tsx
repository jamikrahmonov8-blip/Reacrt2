import React, { useState } from "react"
import { useFormik } from "formik"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { useTodoStore } from "@/Store/Zustand"

function Home() {
  const users = useTodoStore((state) => state.filteredData)

  const addUser = useTodoStore((state) => state.addUser)
  const deleteUser = useTodoStore((state) => state.deleteUser)
  const editUser = useTodoStore((state) => state.editUser)
  const searchUser = useTodoStore((state) => state.searchUser)

  const [open, setOpen] = useState(false)
  const [openE, setOpenE] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)

  const addFormik = useFormik({
    initialValues: { name: "" },
    onSubmit: (values, { resetForm }) => {
      addUser(values.name)
      resetForm()
      setOpen(false)
    },
  })

  const editFormik = useFormik({
    initialValues: { name: "" },
    onSubmit: (values, { resetForm }) => {
      if (editId !== null) {
        editUser(editId, values.name)
      }
      resetForm()
      setOpenE(false)
    },
  })

  const openEdit = (el: any) => {
    setEditId(el.id)
    editFormik.setValues({ name: el.name })
    setOpenE(true)
  }

  return (
    <section className="max-w-[920px] m-auto pt-[30px]">

      <Input
        placeholder="Search"
        onChange={(e) => searchUser(e.target.value)}
      />

      <Button onClick={() => setOpen(true)}>Add</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>

          <form onSubmit={addFormik.handleSubmit}>
            <Input
              name="name"
              value={addFormik.values.name}
              onChange={addFormik.handleChange}
            />

            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openE} onOpenChange={setOpenE}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <form onSubmit={editFormik.handleSubmit} className="flex gap-2">
            <Input
              name="name"
              value={editFormik.values.name}
              onChange={editFormik.handleChange}
            />

            <Button type="submit">Update</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex gap-[20px] flex-wrap mt-5">
        {users.map((el: any) => (
          <div key={el.id} className="p-[20px] w-[160px] border rounded-md">

            <p>{el.name}</p>
            <p>{el.status ? "Active" : "Inactive"}</p>

            <Button onClick={() => deleteUser(el.id)}>
              Delete
            </Button>

            <Button variant="secondary" onClick={() => openEdit(el)}>
              Edit
            </Button>

          </div>
        ))}
      </div>

    </section>
  )
}

export default Home