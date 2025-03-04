import React from 'react'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'

// import { useSnackbar } from 'notistack'

const DeleteBook = () => {
const [loading,setLoading] =useState(false);
const navigate = useNavigate();
const {id} =useParams();

// const {enqueueSnackBar}= useSnackbar();

const handleDeleteBook=()=>{
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then(()=>{
        setLoading(false);
        // enqueueSnackBar('Deleted successfully',{variant:'success'})
        navigate('/');
    })
    .catch((error)=>{
        setLoading(false);
        alert('some error occured while deleting the book');
        // enqueueSnackBar('Error',{variant:'error'})
        console.log(error);
    })
}

  return (
    <div className='p-4'>
      
      <h1 className='text-3x1 my-4'>Delete Book</h1>
      {loading?<Spinner/>:''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
      <h3 className='text-2x1'>Are you sure you want to delete the book?</h3>
      <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>
      <BackButton />
      </div>
    </div>
  )
}

export default DeleteBook
