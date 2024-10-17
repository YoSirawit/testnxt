'use client'
import styles from '@/app/page.module.css'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPet(){
    const [petName, setTitle] = useState('');
  const [ownerName, setContent] = useState('');
  const router = useRouter()

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
        await fetch('/api/add-pet', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({petName, ownerName}) })
            
        router.refresh()
    } catch (error){
        console.error(error)
    }

    setTitle('');
    setContent('');
  };

    return (
        <main className={styles.main}>
            <Link href={'/'}>Home</Link>
        <h1>Add Post</h1>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="petName">petName:</label>
          <input
            type="text"
            id="petName"
            value={petName}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ownerName">ownerName:</label>
          <textarea
            id="ownerName"
            value={ownerName}
            onChange={handleContentChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
    )
}