import React from 'react'

const Chatsidebar = () => {
  return (
    <div className="w-1/4 hidden md:flex flex-col bg-rose-100 border-r border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-rose-600 mb-4">Chats</h2>
            <div className="space-y-3 overflow-y-auto">
              <div className="p-3 bg-white rounded-md shadow hover:bg-rose-50 cursor-pointer">
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-gray-500">Hey there...</p>
              </div>
              <div className="p-3 bg-white rounded-md shadow hover:bg-rose-50 cursor-pointer">
                <p className="font-medium">Alex</p>
                <p className="text-sm text-gray-500">Typing...</p>
              </div>
            </div>
          </div>
  )
}

export default Chatsidebar
