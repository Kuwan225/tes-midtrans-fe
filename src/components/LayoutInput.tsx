import React from 'react'

const LayoutInput = ({label,type}) => {
  return (
    <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
      {label}
    </label>
    <input className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type={type||"text"} placeholder={label}/>
  </div>
  )
}

export default LayoutInput