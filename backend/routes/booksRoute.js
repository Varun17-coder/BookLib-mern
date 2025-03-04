import express from 'express'
import {Book} from '../models/BookModel.js'
const router = express.Router();

// =====> Route for saving a new Book
// working with mongoose is asynchronous process
router.post('/', async(request,response)=>{

    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear'
            });
        }

        //adding the new book
        const newBook={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book= await Book.create(newBook);

        return response.status(201).send(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


// =====> Route for Geting all the booksfrom database
router.get('/',async (request,response)=>{
    try{
        const books= await Book.find({});

        return response.status(200).json({
            counts: books.length,
            data: books
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


// =====> Route for Geting one book from database by id
//  if you need to tag an parameter in routes we use colon in route '/books/:id'
router.get('/:id',async (request,response)=>{
    try{

        const {id}= request.params;

        const book= await Book.findById(id);

        return response.status(200).json(book);

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


// =====> Route to Update the books in the database
router.put('/:id', async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear'
            });
        }

        const {id}= request.params;

        const result= await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(500).json({message:'Book not found'})
        }

        return response.status(200).send({message:'Book updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})


// =====> Route to Delete the book from the database
router.delete('/:id', async(request,response)=>{
    try{

        const {id} =request.params;

        const result= await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Book not found to delete'});
        }

        return response.status(200).send({message:'Book is deleted successfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

export default router;