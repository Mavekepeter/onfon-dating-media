import React, { useState } from 'react'
import axios from 'axios'

const Chatbody = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault() 
    if (!newMessage.trim()) return

    const updatedMessages = [...messages, { from: 'me', text: newMessage }]
    setMessages(updatedMessages)
    setNewMessage('')
    setLoading(true)

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyD-F6Qm_qrK9Jh3slmKOV-KDMFCS3VLVGA',
        {
          contents: [
            {
              parts: [
                {
                  text: newMessage,
                },
              ],
            },
          ],
        }
      )

      const aiReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.'

      setMessages([...updatedMessages, { from: 'other', text: aiReply }])
    } catch (error) {
      console.error('Gemini error:', error)
      setMessages([...updatedMessages, { from: 'other', text: 'Something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scroll-m-3 h-[80vh]">
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
              Typing...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 border-t bg-white flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-rose-600 text-white px-5 py-2 rounded-full hover:bg-rose-700 transition"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </>
  )
}

export default Chatbody
