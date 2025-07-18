import React, { useState, useContext } from 'react'
import { data, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { OnfonContext } from '../context/OnfonContext'

const Register = () => {
  const navigate = useNavigate()
  const { backendUrl } = useContext(OnfonContext)

  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    age: '',
    gender: '',
    county: '',
    town: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const {data} = await axios.post(`${backendUrl}/register`, formData)
    if (data.success) {
      toast.success(data.message || 'Registration successful!')
      navigate('/description')
    } else {
      toast.error(data.error || 'Registration failed')
    }
  } catch (error) {
    toast.error(data.message || 'phone number is already registerd')
    console.error('Registration error: err', error)
    
  }
}


  return (
    <div className="h-120 mt-10 overflow-hidden flex flex-col md:flex-row">

      <div className="md:w-1/2 w-full h-screen flex items-center justify-center bg-rose-500 px-4">
        <div className="h-full w-full overflow-y-auto no-scrollbar flex items-center justify-center">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl space-y-6"
          >
            <motion.h2
              className="text-2xl font-semibold text-rose-600 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Register
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
                whileFocus={{ scale: 1.02 }}
              />

              <motion.input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
                whileFocus={{ scale: 1.02 }}
              />

              <motion.select
                name="gender"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </motion.select>

              <motion.input
                type="text"
                name="phone"
                placeholder="Phone (07...)"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
                whileFocus={{ scale: 1.02 }}
              />

              <motion.input
                type="text"
                name="county"
                placeholder="County"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
                whileFocus={{ scale: 1.02 }}
              />

              <motion.input
                type="text"
                name="town"
                placeholder="Town"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md w-full"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition"
            >
              Continue
            </motion.button>
          </motion.form>
        </div>
      </div>


      <div className="md:w-1/2 w-full h-full hidden md:block">
        <img
          src={assets.onfonreg}
          alt="OnFon Lady"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  )
}

export default Register
