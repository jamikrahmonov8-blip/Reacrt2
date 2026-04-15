import { atom } from 'jotai'
import axios from 'axios'

let url = "http://37.27.29.18:8001/api/to-dos"
export let urlImg = "http://37.27.29.18:8001/images"

export const todosAtom = atom(async () => {
    try {
        
        const {data} = await axios.get(url)
        return data.data
    } catch (error) {
        console.error(error);
        
    }
})

export const deleteTodoAtom = atom(
  null,
  async (get,set,id: number) => {
    await axios.delete(`${url}?id=${id}`)
    return id
  }
)
