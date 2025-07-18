import React, { useState, useContext } from 'react'
import axios from 'axios'
import { OnfonContext } from '../context/OnfonContext'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Mpesa = () => {
  const location = useLocation()
  const { user } = location.state || {}
  const { backendUrl } = useContext(OnfonContext)
   const navigate=useNavigate()
  const [phone, setPhone] = useState(user?.phone_number || '')
  const [amount, setAmount] = useState('50')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePayment = async () => {
    if (!phone || !amount) {
      setMessage('Please enter both phone number and amount.')
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${backendUrl}/pay`, {
        phone ,
        amount,
        name: user?.name || 'Client',
        town: user?.town || 'Unknown'
      })
      navigate('/')

      setMessage(res.data.message || 'Payment and WhatsApp sent!')

      const whatsappMessage = ` Match Payment Received\n\nName: ${user?.name}\nAge: ${user?.age}\nGender: ${user?.gender}\nCounty: ${user?.county}\nTown: ${user?.town}\n\nContact: ${phone}\nAmount: Ksh ${amount}`
      const encodedMessage = encodeURIComponent(whatsappMessage)
      const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`

      window.open(whatsappUrl, '_blank')

    } catch (err) {
      console.error(err)
      setMessage('Payment failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">M-Pesa Payment</h2>

      <label className="block mb-2 font-medium">Phone Number</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="2547......."
        className="w-full border px-4 py-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Amount (Ksh)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border px-4 py-2 rounded mb-4"
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
      >
        {loading ? 'Processing...' : 'Pay with M-Pesa'}
      </button>

      {message && <p className="mt-4 text-center text-blue-700">{message}</p>}
    </div>
  )
}

export default Mpesa
