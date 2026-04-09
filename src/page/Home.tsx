import React, { useEffect, useState } from 'react'
import axios from 'axios'



let api = "http://37.27.29.18:8001/api/to-dos"
let apImg = "http://37.27.29.18:8001/images"


function Home() {
  const [data, setData] = useState<any>([])

  async function Getuse() {
    try {
      const { data } = await axios.get(api)
      setData(data.data)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    Getuse()
  }, [])
  return (
    <>
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
          {data.map((el: any) => {
            return (
              <tr key={el.id}>
                <td>
                  {
                    el.images?.map((img: any) => {
                      return (
                        <img
                          key={img.id}
                          src={`${apImg}/${img.imageName}`}
                          alt=""
                          className="w-[50px] h-[50px] object-cover m-auto"
                        />
                      );
                    })
                  }
                </td>
                <td>{el.name}</td>
                <td>{el.description}</td>
                <td>
                  <button>Delet</button>
                  <button>Edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default Home