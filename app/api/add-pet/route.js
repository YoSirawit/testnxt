import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
    const res = await request.json();
    const {petName, ownerName} = res;
    console.log({res});
  
    try {
       if (!petName || !ownerName) throw new Error('Pet and owner names required');
      await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
    } catch (error) {
       return NextResponse.json({ error }, { status: 500 });
    }
  
    const pets = await sql`SELECT * FROM Pets;`;
    return NextResponse.json({ pets: pets.rows }, { status: 200 });
}