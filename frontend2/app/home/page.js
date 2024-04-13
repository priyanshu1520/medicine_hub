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
        <div>
            <Link href='/home/add'>Add Medicine</Link>
            <br />
            <input onChange={e=>setName(e.target.value)} className="text-black" type="text" placeholder="medicine name" />
            <button onClick={handleSearch}>Search Medicine</button>
            
            {searched && ( // Only render when searched is true
                medicine.length === 0 ? (
                    <div> No medicine found </div> 
                ) : (
                    <div>
                        {/* <p>render all medicine beautifully here</p> */}
                        {medicine.map(med =>{
                            return <div key={med._id}> 
                                {med.name}
                            </div>
                        })}
                    </div>
                )
            )}
        </div>
    )
}
