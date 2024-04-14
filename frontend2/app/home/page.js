"use client"
import Link from "next/link";
import axios from 'axios'
import { useState } from "react";


export default function(){
    const [medicine , setMedicine] = useState([]) ;
    const [name , setName] = useState('') ;
    const [searched, setSearched] = useState(false); // Track if search has been performed
    
    const handleSearch = async () => {
        const data = await axios.get(`http://localhost:3000/medicine/med?name=${name}` , {
            headers :{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }  
        })
        setMedicine(data.data.medicine);
        setSearched(true); // Update state after search
    };

    return (
        <div className="bg-gray-100 p-4 flex flex-col items-center">
  <Link 
    href='/home/add' 
    className="text-blue-500 hover:text-blue-700 mb-4 text-lg font-bold"
  >
    Add Medicine
  </Link>
  <input 
    onChange={e => setName(e.target.value)} 
    className="text-black p-2 my-2 w-64 rounded border shadow-inner" 
    type="text" 
    placeholder="medicine name" 
  />
  <button 
    onClick={handleSearch} 
    className="bg-blue-500 text-white p-2 w-64 rounded hover:bg-blue-600 shadow-lg"
  >
    Search Medicine
  </button>
  
  {searched && ( // Only render when searched is true
    medicine.length === 0 ? (
      <div className="mt-4 text-red-500 font-semibold"> No medicine found </div> 
    ) : (
      <div className="mt-4 w-64">
        {medicine.map(med => {
          return (
            <div 
              key={med._id} 
              className="p-2 my-2 bg-black rounded shadow-md flex justify-center items-center"
            > 
             Name = {med.name}, 
            Quantity = {med.quantity}, 
             contact no.= {med.contact}, 
              Address = {med.address}
            
            </div>
          )
        })}
      </div>
    )
  )}
</div>

    )
}
