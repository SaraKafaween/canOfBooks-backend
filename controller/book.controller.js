'use strict';

const {userModel} = require('../models/user.model');

const getbooks = (request, response) => {

    const { email } = request.query;
    // console.log(request.query.email,'hi');
    console.log(userModel);
    userModel.find({ ownerEmail: email }, (error, user) => { // find the user data that matches email in the userModel collection
        if (error) {
           } else {
            response.json(user)
        }
    });
}
const createBook = (req, res) => {

    const ownerEmail= req.body.ownerEmail;
    const title = req.body.title;
    console.log(title);
    const description = req.body.description;
    console.log(description);
    const status = req.body.status;
    console.log(status);
    console.log(req.body);
    const newBookObj=new userModel({
        ownerEmail:ownerEmail,
        books:{
        title,
        description,
        status,
        }
      });
      console.log(newBookObj);
      newBookObj.save();
      res.json(newBookObj);
    }

    const deleteBook = (req,res) => {
        try{
            const id=req.params.book_id;
            const {ownerEmail}=req.query;
            console.log(id);
            console.log(ownerEmail);
            userModel.findOne({ ownerEmail: email }, (error, data) => {
                data[0].books.splice(id,1);
                data.save();
                    res.send(data); 
            })  
        }
        catch(error){
            res.send(error.info);
        }
        };




// get both the params and the req body data .
// - the params will used to get the id of item we want to update in our DB,
//the body will contain the new data but we want to update
// const updateBook = async(req,res)=>{
// const bookId = req.params.books_id; // the same in the server
// const { title,description,status} =req.body;

// localhost/book/copy of id of any book (PUT,JSON,Body)
// userModel.findByIdAndUpdate( // this method witll return the old data even if it got updated
//     // so we need to provide a flag to tell the method to return the new updated data
//     {_id: bookId} ,
//     //specify the id of item want to update
//     {
// title:title,
// description:description,
// status:
//     },// hon lw 76et w7deh bs b36e undefined lazem kol el list 7ta lw bghyer w7deh bs
//     {new : true}, // the flag to tell the method to return the new updated data
//     (err,data)=>{
//         res.send(data);
//     }
// )
// }


module.exports = {getBooks,
    createBook,
    deleteBook }