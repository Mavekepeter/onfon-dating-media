import React, { useState, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { OnfonContext } from '../context/OnfonContext'
import { motion } from 'framer-motion'
const Description = () => {
  const [description, setDescription] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()
  const { backendUrl } = useContext(OnfonContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${backendUrl}/description`, {
        phone,
        description,
      })

      if (res.status === 200) {
        toast.success(res.data.message || 'Description saved')
        navigate('/details')
      } else {
        toast.error(res.data.message || 'Failed to save description')
      }
    } catch (err) {
      console.error('Description submission error:', err)
      toast.error(err.response?.data?.message || 'Server error')
    }
  }

  return (
    <div className="h-120 flex flex-col md:flex-row overflow-hidden mt-10">
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src={assets.onfonreg}
          alt="OnFon Lady"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center bg-rose-500 px-4">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center text-rose-600">
            About You
          </h2>

          <input
            type="text"
            placeholder="Phone (07...)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          <textarea
            placeholder="Write a short description about yourself..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 border px-4 py-2 rounded-md resize-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition"
          >
            Save Description
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default Description
