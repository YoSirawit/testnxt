// "use client"
import React from 'react'
import Navbar from "./components/Navbar";
import Link from 'next/link';
import { sql } from '@vercel/postgres';
import Petinfo from './components/petinfo';
import { NextResponse } from 'next/server';

async function getPets(){
    const pets = await sql`SELECT * FROM Pets;`
    return pets;
}


async function Home() {

  const pets = await getPets();
  console.log({pets});
  
  return (
    <div>
        <Navbar />
        <div className='container mx-auto'>
            <h3>Home</h3>
            <h1><Link href="/api/get-pet-info?">Test</Link></h1>
            <Link href="/add-pet">Add pet</Link>
            {
              pets.rows.map((pet) => {
                return(
                  <Petinfo key={pet.name} name={pet.name} owner={pet.owner}/>
                )})

            }
        </div>
    </div>
  )
}

export default Home
