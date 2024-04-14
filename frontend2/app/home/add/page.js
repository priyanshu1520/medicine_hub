"use client"
import axios from 'axios'
import { useState } from 'react'

export default function(){
    const [name , setName] = useState("") ;
    const [expiry , setExpiry] = useState("") ;
    const [quantity , setQuantity] = useState("") ;
    const [contact , setContact] = useState("") ;
    const [address , setAddress] = useState("") ;

    return <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="w-[200px] bg-white p-4 rounded shadow">
      <input 
        onChange={e => setName(e.target.value)} 
        className="text-black p-2 mb-2 w-full rounded border" 
        type="text" 
        placeholder="medicine name" 
      />
      <input 
        onChange={e => setExpiry(e.target.value)} 
        className="text-black p-2 mb-2 w-full rounded border" 
        type="date" 
        placeholder="expiry date" 
      />
      <input 
        onChange={e => setQuantity(e.target.value)} 
        className="text-black p-2 mb-2 w-full rounded border" 
        type="number" 
        placeholder="quantity" 
      />
      <input 
        onChange={e => setContact(e.target.value)} 
        className="text-black p-2 mb-2 w-full rounded border" 
        type="text" 
        placeholder="contact number" 
      />
      <input 
        onChange={e => setAddress(e.target.value)} 
        className="text-black p-2 mb-2 w-full rounded border" 
        type="text" 
        placeholder="address" 
      />
      <button 
        onClick={async () => {
          const res = await axios.post("http://localhost:3000/medicine", {
            name,
            expiry_date: expiry,
            quantity,
            contact,
            address
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
        }} 
        className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  </div>
  

}