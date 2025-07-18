import React, { useState, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { OnfonContext } from '../context/OnfonContext'

const Match = () => {
  const { backendUrl } = useContext(OnfonContext)
  const navigate = useNavigate()

  const [phone, setPhone] = useState(localStorage.getItem('userPhone') || '')
  const [ageRange, setAgeRange] = useState('')
  const [town, setTown] = useState('')
  const [matches, setMatches] = useState([])
  const [matchRequestId, setMatchRequestId] = useState(null)
  const [startAt, setStartAt] = useState(3)

  const [selectedInfo, setSelectedInfo] = useState({}) 
  const handleMatch = async () => {
    if (!phone || !ageRange || !town) {
      return toast.error('Fill all fields')
    }

    try {
      const res = await axios.post(`${backendUrl}/match`, {
        phone,
        age_range: ageRange,
        town
      })

      toast.success(res.data.message)
      setMatches(res.data.matches)
      setStartAt(3)
      setMatchRequestId(res.data.match_request_id)
      setSelectedInfo({})
    } catch (err) {
      toast.error(err.response?.data?.message || 'Match failed')
    }
  }

  const loadMore = async () => {
    try {
      const res = await axios.post(`${backendUrl}/match/next`, {
        match_request_id: matchRequestId,
        start_at: startAt
      })
      setMatches(prev => [...prev, ...res.data.matches])
      setStartAt(prev => prev + 3)
    } catch (err) {
      toast.error('No more matches')
    }
  }

  const viewDetails = async (userPhone) => {
    if (selectedInfo[userPhone]) {
      // Toggle off if already shown
      const updated = { ...selectedInfo }
      delete updated[userPhone]
      return setSelectedInfo(updated)
    }

    try {
      const res = await axios.get(`${backendUrl}/describe/${userPhone}`)
      setSelectedInfo(prev => ({
        ...prev,
        [userPhone]: res.data
      }))
    } catch (err) {
      toast.error('Failed to fetch description/details')
    }
  }

  const handleInterest = (toPhone) => {
    localStorage.setItem('targetPhone', toPhone)
    navigate('/interest')
  }

  return (
    <div className="min-h-screen mt-10 py-10 px-4 bg-rose-50 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-rose-600">Find Your Match</h2>

        <input
          type="text"
          placeholder="Your Phone (07...)"
          className="w-full border px-4 py-2 rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Age Range (e.g., 20-30)"
          className="w-full border px-4 py-2 rounded-md"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        />

        <input
          type="text"
          placeholder="Preferred Town"
          className="w-full border px-4 py-2 rounded-md"
          value={town}
          onChange={(e) => setTown(e.target.value)}
        />

        <button
          className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition"
          onClick={handleMatch}
        >
          Find Match
        </button>
      </motion.div>

      {matches.length > 0 && (
        <div className="mt-10 w-full max-w-2xl space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Matched Users</h3>
          {matches.map((m, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md space-y-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{m.name}</p>
                  <p className="text-sm text-gray-500">Age: {m.age}</p>
                  <p className="text-rose-500">{m.phone}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => viewDetails(m.phone)}
                    className="bg-rose-400 text-white px-2 py-1 rounded hover:bg-rose-700"
                  >
                    {selectedInfo[m.phone] ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => handleInterest(m.phone)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    I'm Interested
                  </button>
                </div>
              </div>

              {selectedInfo[m.phone] && (
                <div className="text-sm text-gray-700 mt-2 border-t pt-2 space-y-1">
                  <p><strong>Description:</strong> {selectedInfo[m.phone].description}</p>
                  <p><strong>Education:</strong> {selectedInfo[m.phone].education}</p>
                  <p><strong>Profession:</strong> {selectedInfo[m.phone].profession}</p>
                  <p><strong>Marital Status:</strong> {selectedInfo[m.phone].marital_status}</p>
                  <p><strong>Religion:</strong> {selectedInfo[m.phone].religion}</p>
                  <p><strong>Ethnicity:</strong> {selectedInfo[m.phone].ethnicity}</p>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={loadMore}
            className="w-full mt-4 bg-rose-500 text-white py-2 rounded-md hover:bg-rose-600 transition"
          >
            See More Matches
          </button>
        </div>
      )}
    </div>
  )
}

export default Match
