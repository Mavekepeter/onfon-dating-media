import React, { useState } from 'react'
import axios from 'axios'

const Chatbody = () => {
  const [messages, setMessages] = useState([])
  const [formType, setFormType] = useState(null)
  const [formData, setFormData] = useState({
    phone: '254708374149',
    name: '',
    age: '',
    gender: '',
    county: '',
    town: '',
    education: '',
    profession: '',
    marital_status: '',
    religion: '',
    ethnicity: '',
    description: '',
    age_range: '',
    interests: ''
  })

  const [loading, setLoading] = useState(false)

  const addMessage = (from, text) => {
    setMessages(prev => [...prev, { from, text }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const phone = formData.phone
    let url = ''
    let payload = {}

    try {
      switch (formType) {
        case 'register':
          url = 'http://localhost:5001/register'
          payload = {
            phone,
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            county: formData.county,
            town: formData.town
          }
          break
        case 'details':
          url = 'http://localhost:5001/details'
          payload = {
            phone,
            education: formData.education,
            profession: formData.profession,
            marital_status: formData.marital_status,
            religion: formData.religion,
            ethnicity: formData.ethnicity
          }
          break
        case 'description':
          url = 'http://localhost:5001/description'
          payload = {
            phone,
            description: formData.description
          }
          break
        case 'match':
          url = 'http://localhost:5001/match'
          payload = {
            phone,
            age_range: formData.age_range,
            town: formData.town
          }
          break
        case 'interest':
          url = 'http://localhost:5001/interest'
          payload = {
            phone,
            interests: formData.interests
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
      addMessage('other', 'An error occurred.')
    } finally {
      setLoading(false)
      setFormType(null)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto space-y-4 h-[70vh]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.from === 'me'
                  ? 'bg-rose-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              } shadow`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 bg-gray-100 text-gray-500 rounded-lg shadow">
              Processing...
            </div>
          </div>
        )}
      </div>

      {formType && (
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t bg-white flex flex-col gap-2"
        >
          <input name="phone" value={formData.phone} onChange={handleChange} className="input" placeholder="Phone" required />

          {formType === 'register' && (
            <>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
              <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
              <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
              <input name="county" value={formData.county} onChange={handleChange} placeholder="County" required />
              <input name="town" value={formData.town} onChange={handleChange} placeholder="Town" required />
            </>
          )}

          {formType === 'details' && (
            <>
              <input name="education" value={formData.education} onChange={handleChange} placeholder="Education" required />
              <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" required />
              <input name="marital_status" value={formData.marital_status} onChange={handleChange} placeholder="Marital Status" required />
              <input name="religion" value={formData.religion} onChange={handleChange} placeholder="Religion" required />
              <input name="ethnicity" value={formData.ethnicity} onChange={handleChange} placeholder="Ethnicity" required />
            </>
          )}

          {formType === 'description' && (
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
          )}

          {formType === 'match' && (
            <>
              <input name="age_range" value={formData.age_range} onChange={handleChange} placeholder="Age Range (e.g. 25-35)" required />
              <input name="town" value={formData.town} onChange={handleChange} placeholder="Town" required />
            </>
          )}

          {formType === 'interest' && (
            <textarea name="interests" value={formData.interests} onChange={handleChange} placeholder="Enter your interests" required />
          )}

          <button type="submit" className="bg-rose-600 text-white px-5 py-2 rounded-full hover:bg-rose-700">
            Submit
          </button>
        </form>
      )}

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
