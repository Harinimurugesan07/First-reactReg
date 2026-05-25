import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
const Users = () => {
    const [users, setUsers]=useState([])
    useEffect(()=>{
        getUsers()
    }, [])
    const getUsers =async()=>{
        try {
            const res = await axios.get("http://127.0.0.1:8000/users")
            setUsers(res.data.users)
        } catch (error) {
            console.log(error)
            
        }
    }

  return (
    <div>
      <h1>All Users</h1>
      <table border="1" cellPadding="10">
        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>

        </thead>
        <tbody>
            {users.map((user, index) =>( 
                <tr key={index}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>{user[3]}</td>
                </tr>

            ))}




        </tbody>
      </table>
    </div>
  )
}

export default Users
