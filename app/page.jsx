// "use client"
import React from 'react'
import Navbar from "./components/Navbar";
import Link from 'next/link';
import { sql } from '@vercel/postgres';
import Petinfo from './components/petinfo';
import { NextResponse } from 'next/server';
// import { useState } from 'react';


// type Pet = {
//   pet?: String,
//   owner?: String
// };


async function getPets(){
  try{
    const pets = await fetch('http://localhost:3000/api/get-pet-info', {cache: 'no-store'});
    const data = await pets.json();
    return data;
  } catch (error){
      console.error(error);
  }

  // const pets = sql`SELECT * FROM Pets`
  // return pets


}

function removeall(){
  sql`DELETE FROM Pets`
}

async function Home() {

  let pets = await getPets();
  console.log({pets});

  // const pets = await getPets();

  // const [pet, setPet] = useState<Pet | null>(null)
  
  // const getPetInfo = async ()=>{
  //   try {
  //     const pets = await fetch('http://localhost:3000/api/get-pet-info', { method: "GET"});
  //     if (pets){
  //       console.log(pets);
  //       const { pet } = await pets.json();
  //       if(pet) setPet(pet);
  //     } 
  //   }catch(error){
  //     console.log(error);
  //   };


  // }
  // console.log(pet.pets);

  // useEffect(()=>{
  //   getPetInfo();
  // }, []);
  
  return (
    <div>
        <Navbar />
        <div className='container mx-auto'>
            <h3>Home</h3>
            <h1><Link href="/api/get-pet-info">Test</Link></h1>
            <Link href="/add-pet">Add pet</Link>

        </div>
            {
              pets.pets.rows.map((pet) => {
                return(
                  <Petinfo key={pet.name} name={pet.name} owner={pet.owner}/>
                )})

            }
    </div>
  )
}


export default Home

