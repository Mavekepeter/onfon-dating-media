import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { OnfonContext } from '../context/OnfonContext'
import { assets } from '../assets/assets'

export const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const { backendUrl } = useContext(OnfonContext)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/getuser`)
        const foundUser = res.data.users.find((u) => u.id === parseInt(id))
        setUser(foundUser)
      } catch (err) {
        console.error('Failed to fetch user:', err)
      }
    }

    fetchUser()
  }, [backendUrl, id])

  if (!user) {
    return <div className="p-6">Loading user info...</div>
  }

  return (
    <div className="p-6 flex flex-col sm:flex-row gap-6">
      <div className="sm:w-1/3">
       <img
              src={`${backendUrl}/uploads/${user.image_filename || 'default.jpg'}`}
              alt={user.name}
              className="w-full h-full  object-cover mb-3 "
            />
      </div>

      <div className="sm:w-2/3 space-y-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>County:</strong> {user.county}</p>
        <p><strong>Town:</strong> {user.town}</p>
       <p>
       <strong>Phone:</strong>{' '}
      <span className="blur-sm text-gray-400 select-none">{user.phone_number}</span>
       </p>

        <p><strong>Pay fee of Ksh 50:</strong> To receive her number via WhatsApp</p>
        <button
          onClick={() => navigate('/mpesa', { state: { user } })}
          className="mt-4 bg-white-100 hover:bg-green-700 text-green-950 font-semibold px-6 py-2 rounded shadow"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay via M-Pesa'}
        </button>
      </div>
    </div>
  )
}
