import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { OnfonContext } from '../context/OnfonContext'

const Details = () => {
  const { backendUrl } = useContext(OnfonContext)
  const [formData, setFormData] = useState({
    phone: '',
    education: '',
    profession: '',
    marital_status: '',
    religion: '',
    ethnicity: ''
  })

  const navigate = useNavigate()

  useEffect(() => {
    const phone = localStorage.getItem('userPhone')
    if (phone) {
      setFormData(prev => ({ ...prev, phone }))
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${backendUrl}/details`, formData)

      if (res.status === 200) {
        toast.success(res.data.message || 'Details saved successfully')
        navigate('/')
      } else {
        toast.error(res.data.message || 'Submission failed')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error')
      console.error(err)
    }
  }

  return (
    <div className="h-130 flex flex-col md:flex-row overflow-hidden mt-10">
      {/* Right Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-rose-500 px-4">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl space-y-6"
        >
          <h2 className="text-3xl font-semibold text-center text-rose-600">Your Details</h2>

          {/* Row 1: Phone + Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone (07...)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            />

            <input
              type="text"
              name="education"
              placeholder="Level of Education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          {/* Row 2: Profession (full width) */}
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          {/* Row 3: Marital Status + Religion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            >
              <option value="">Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>

            <input
              type="text"
              name="religion"
              placeholder="Religion"
              value={formData.religion}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>

          {/* Row 4: Ethnicity (full width) */}
          <input
            type="text"
            name="ethnicity"
            placeholder="Ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition"
          >
            Continue
          </button>
        </motion.form>
      </div>

      {/* Left Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src={assets.details}
          alt="User Form"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}

export default Details
