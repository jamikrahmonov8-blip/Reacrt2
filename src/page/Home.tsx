import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/Store/Store"
import { addUser, deleteUser, editUser, searchUser } from "@/Store/todo"

import { useFormik } from "formik"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

function Home() {
    const { data } = useSelector((store: RootState) => store.todo)
    const users = useSelector((state: RootState) => state.todo.filteredData)
    const dispatch = useDispatch<AppDispatch>()

    const [open, setOpen] = useState(false)
    const [openE, setOpenE] = useState(false)
    const [editId, setEditId] = useState<number | null>(null)




    const editFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
        },
        onSubmit: (values, { resetForm }) => {
            if (editId !== null) {
                dispatch(editUser({ id: editId, name: values.name }))
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

    const addFormik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: (values, { resetForm }) => {
        dispatch(addUser(values))
        resetForm()
        setOpen(false)
        }
    })

    return (
        <section className="max-w-[920px] m-auto pt-[30px]">
   <Input placeholder="Search" onChange={(e)=>dispatch(searchUser(e.target.value))} />
            <Button onClick={() => setOpen(true)}>Add</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add User</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={addFormik.handleSubmit}>

                        <Input placeholder="name " name="name" value={addFormik.values.name} onChange={addFormik.handleChange}/>
<Button type="submit" variant={"default"}>save</Button>
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

                        <Button onClick={() => dispatch(deleteUser(el.id))}>
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