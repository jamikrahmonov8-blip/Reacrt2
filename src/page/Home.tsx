import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useFormik } from 'formik'
import * as Yup from "yup"

let api = "http://37.27.29.18:8001/api/to-dos"
let apImg = "http://37.27.29.18:8001/images"

type Image = {
  id: number
  imageName: string
}

type Todo = {
  id: number
  name: string
  description: string
  images: Image[]
}

function Home() {

  const [data, setData] = useState<Todo[]>([])
  const [file, setFile] = useState<File | null>(null)

  async function get() {
    try {
      const { data } = await axios.get(api)
      setData(data.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    get()
  }, [])

  async function deleteUser(id: number) {
    try {
      await axios.delete(`${api}?id=${id}`)
      get()
    } catch (error) {
      console.error(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Обязательно"),
      description: Yup.string().required("Обязательно")
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("description", values.description)
        if (file) {
          formData.append("images", file)
        }

        await axios.post(api, formData)
        resetForm()
        setFile(null)
        get()
      } catch (error) {
        console.error(error)
      }
    }
  })

  return (
    <section className='max-w-[920px] m-auto'>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add +</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Todo</DialogTitle>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">

            <input
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="border p-2"
            />

            <input
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="border p-2"
            />

            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0])
                }
              }}
            />

            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>

      <table className='border w-[60%] m-auto text-center'>
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th>Img</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((el) => (
            <tr key={el.id}>
              <td>
                {el.images?.map((img) => (
                  <img
                    key={img.id}
                    src={`${apImg}/${img.imageName}`}
                    className="w-[50px] h-[50px] object-cover m-auto"
                  />
                ))}
              </td>

              <td>{el.name}</td>
              <td>{el.description}</td>

              <td>
                <Button onClick={() => deleteUser(el.id)}>Delete</Button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </section>
  )
}

export default Home