import React, { useState } from 'react'
import axios from 'axios'

const Chatbody = () => {
  const [messages, setMessages] = useState([])
  const [formType, setFormType] = useState(null)
  const [formData, setFormData] = useState({
    phone: '254708374149',
    combined: ''
  })
  const [loading, setLoading] = useState(false)

  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const phone = formData.phone
    const values = formData.combined.split('#').map(v => v.trim())
    let url = ''
    let payload = { phone }

    try {
      switch (formType) {
        case 'register':
          url = 'http://backend:5001/register'
          payload = {
            phone,
            name: values[0],
            age: values[1],
            gender: values[2],
            county: values[3],
            town: values[4]
          }
          break
        case 'details':
          url = 'http://localhost:5001/details'
          payload = {
            phone,
            education: values[0],
            profession: values[1],
            marital_status: values[2],
            religion: values[3],
            ethnicity: values[4]
          }
          break
        case 'description':
          url = 'http://localhost:5001/description'
          payload = {
            phone,
            description: values[0]
          }
          break
        case 'match':
          url = 'http://localhost:5001/match'
          payload = {
            phone,
            age_range: values[0],
            town: values[1]
          }
          break
        case 'interest':
          url = 'http://localhost:5001/interest'
          payload = {
            phone,
            interests: values[0]
          }
          break
        default:
          return
      }

      const res = await axios.post(url, payload)

      if (formType === 'match') {
        const matchList = res.data.matches?.map(
          m => `${m.name}, Age: ${m.age}, Phone: ${m.phone}`
        ).join('\n') || 'No matches found.'
        addMessage('other', matchList)
      } else {
        addMessage('other', res.data.message)
      }
    } catch (err) {
      addMessage('other', 'An error occurred check on your internet connectivity😭 .')
    } finally {
      setLoading(false)
      setFormType(null)
      setFormData({ ...formData, combined: '' }) 
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getPlaceholder = () => {
    switch (formType) {
      case 'register': return 'name#age#gender#county#town'
      case 'details': return 'education#profession#marital_status#religion#ethnicity'
      case 'description': return 'description'
      case 'match': return 'age_range#town'
      case 'interest': return 'interests'
      default: return ''
    }
  }

  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 h-[70vh] bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg shadow ${msg.from === 'me' ? 'bg-rose-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 bg-gray-200 text-gray-600 rounded-lg shadow">
              Processing...
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      {formType && (
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex flex-col gap-2">
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone (e.g. 2547...)"
            className="p-2 border rounded"
            required
          />
          <input
            name="combined"
            value={formData.combined}
            onChange={handleChange}
            placeholder={getPlaceholder()}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-rose-600 text-white px-5 py-2 rounded-full hover:bg-rose-700">
            Submit
          </button>
        </form>
      )}

      {/* Action Buttons */}
      <div className="p-4 bg-gray-100 flex flex-wrap gap-2 border-t">
        <button onClick={() => setFormType('register')} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Register
        </button>
        <button onClick={() => setFormType('details')} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
          Add Details
        </button>
        <button onClick={() => setFormType('description')} className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700">
          Add Description
        </button>
        <button onClick={() => setFormType('match')} className="bg-orange-600 text-white px-4 py-1 rounded hover:bg-orange-700">
          Match
        </button>
        <button onClick={() => setFormType('interest')} className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700">
          Add Interest
        </button>
      </div>
    </>
  )
}

export default Chatbody
