import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { OnfonContext } from '../context/OnfonContext'
import { useNavigate } from 'react-router-dom'

const Topusers = () => {
  const [users, setUsers] = useState([])
  const { backendUrl } = useContext(OnfonContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${backendUrl}/getuser`)
        setUsers(res.data.users.slice(0, 10))
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }

    fetchUsers()
  }, [backendUrl])

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/user/${user.id}`)}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={`${backendUrl}/uploads/${user.image_filename || 'default.jpg'}`}
              alt={user.name}
              className="w-full h-full  object-cover mb-3 "
            />
            <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
            <p className="text-gray-500">{user.town || 'Unknown Location'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Topusers
