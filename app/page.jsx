// "use client"
import React from 'react'
import Navbar from "./components/Navbar";
import Link from 'next/link';
import { sql } from '@vercel/postgres';
import Petinfo from './components/petinfo';
import { NextResponse } from 'next/server';

async function getPets(){
  try{
    const pets = await fetch('testnxt-neon.vercel.app/api/get-pet-info', {cache: 'no-store'});
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

  // let pets = await getPets();
  // console.log({pets});

  const pets = await getPets();
  console.log(pets.pets);
  
  
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

