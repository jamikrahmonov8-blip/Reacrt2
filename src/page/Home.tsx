import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTodos, deleteTodo } from "@/Store/todo"
import { Button } from "@/components/ui/button"

let apImg = "http://37.27.29.18:8001/images"

function Home() {
  const dispatch = useDispatch<any>()
  const data = useSelector((state: any) => state.todo.todos)

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  return (
    <div className="grid grid-cols-3 gap-5">
      {data.map((el: any) => (
        <div key={el.id}>
          {el.images?.map((img: any) => (
            <img
              key={img.id}
              src={`${apImg}/${img.imageName}`}
              alt=""
              className="w-[200px]"
            />
          ))}

          <h1>{el.name}</h1>

          <Button onClick={() => dispatch(deleteTodo(el.id))}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Home