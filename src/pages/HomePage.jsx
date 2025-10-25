import CardNote from '../components/CardNote.jsx';
import axios from 'axios';
import {useState, useEffect} from 'react';
import formatDate from '../utils/formatDate.js';

const apiURL= import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [notes, setNotes]= useState([]);
  const [loading, setLoading]= useState(true);

  useEffect(()=>{
const fetchData= async (req, res)=>{
  try {
  const response= await axios.get(`${apiURL}/api/notes`);
  setNotes(response.data);
  setLoading(false);
   console.log(response);
} catch (error) {
  console.error(error);
}
}
fetchData();
  }, []);

if(loading) return <span>Loading...</span>;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
       {notes.map(note=>(
        <CardNote 
        key={note._id}
        title={note.title}
        description={note.description}
        id={note._id}
        date={formatDate(note.createdAt)}
        />
       ))}
    </div>
  )
}
export default HomePage;
