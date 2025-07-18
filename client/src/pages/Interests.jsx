import React, { useEffect, useState, useContext } from 'react'
import { OnfonContext } from '../context/OnfonContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Interest = () => {
  const { backendUrl } = useContext(OnfonContext)
  const [toPhone, setToPhone] = useState('')
  const [fromPhone, setFromPhone] = useState(localStorage.getItem('userPhone') || '')

  useEffect(() => {
    setToPhone(localStorage.getItem('targetPhone') || '')
  }, [])

  const expressInterest = async () => {
    try {
      await axios.post(`${backendUrl}/interest`, {
        from: fromPhone,
        to: toPhone
      })
      toast.success('Interest expressed!')
    } catch (error) {
        console.log(error);
        
      toast.error('Failed to express interest')
    }
  }

  return (
    <div className="p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Express Interest</h2>
      <p className="text-center mb-4">You are expressing interest in: <strong>{toPhone}</strong></p>
      <button
        onClick={expressInterest}
        className="block mx-auto bg-rose-600 text-white px-6 py-2 rounded-md"
      >
        Confirm Interest
      </button>
    </div>
  )
}

export default Interest
