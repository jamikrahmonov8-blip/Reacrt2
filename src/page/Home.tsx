import { useAtomValue, useSetAtom } from 'jotai'
import { todosAtom, deleteTodoAtom, urlImg } from '../atoms/Atom'
import { Button } from '@/components/ui/button'

export default function Home() {
  const todos = useAtomValue(todosAtom)
  const deleteTodo = useSetAtom(deleteTodoAtom)

  if (!todos) return <p>Загрузка...</p>

  return (
    <div>
      {todos.map((todo: any) => (
        <div key={todo.id} className='w-[200px] h-[300px]'>
          {todo.images?.map((img: any) => (
            <img 
              key={img.id} 
              src={`${urlImg}/${img.imageName}`} 
              alt="" 
            />
          ))}
          <span>{todo.name}</span>
          <Button onClick={() => deleteTodo(todo.id)}>
            Удалить
          </Button>
        </div>
      ))}
    </div>
  )
}
