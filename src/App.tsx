import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "./components/ui/button";

type User = {
  id: number;
  name: string;
  age: number;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const formik = useFormik({
    initialValues: {
      id:null,
      name: "",
      age: "",
    },

    onSubmit: (values, { resetForm }) => {
      const newUser: User = {
        id: Date.now(),
        name: values.name,
        age: Number(values.age),
      };

      setUsers([...users, newUser]);
      resetForm();
    },
  });


  function edit(user: User) {
  formik.setValues({
    id: user.id,
    name: user.name,
    age: String(user.age),
  });
  }
  return (
    <div style={{ padding: "20px" }}>
      
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <input
          type="number"
          name="age"
          placeholder="age"
          onChange={formik.handleChange}
          value={formik.values.age}
        />

        <button type="submit">Добавить</button>
      </form>

        <table border={1} style={{ marginTop: "20px", width: "300px" } } className="border-2">
        <thead>
          <tr>
            <th className="text-left">Имя</th>
            <th>Возраст</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age} <Button variant={"default"} onClick={()=>edit(user)}>Edit</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;