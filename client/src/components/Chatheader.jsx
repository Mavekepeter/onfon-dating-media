import React from 'react'
import { assets } from '../assets/assets'
const Chatheader = () => {
  return (
     <div className="p-4 bg-white border-b border-gray-200 flex items-center gap-3">
          <img
            src={assets.onfonreg}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold">Jane Doe</h3>
            <p className="text-sm text-gray-500">offline</p>
          </div>
        </div>
  )
}

export default Chatheader
