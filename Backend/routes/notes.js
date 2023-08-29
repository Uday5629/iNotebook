const express=require('express');
const router=express.Router();
const Notes=require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { validationResult, ValidationChain } = require('express-validator');
const { body } = require('express-validator');
const cors = require("cors");

router.use(cors());
//////      Route 1: Get all notes , "Login Required"     //////////////////  

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const notes=await Notes.find({user: req.user.id});
         res.json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      }
})
////////// Add new Note using Post, Login required /////////////////

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title ').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({ min: 6 })],async (req,res)=>
    {   
        try {
        const{title,description,tag}=req.body;

        /////////////////   if there are errors   ///////////////////
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note=new Notes({
            title,description,tag,user: req.user.id
        })
        const savedNote=await note.save();
    res.json(savedNote);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      }
})
//////////////  Route : 4 Update Note Using userId  /////////////////////

router.put('/updatenote/:id',fetchuser,[
    body('title','enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 Characters').isLength({min:5})],async(req,res)=>{
       try{
        const{title,description,tag}=req.body;
        const newNote={};
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        let note=await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")};

        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
     } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      }
    })
//////////////  Route : 5 Delete Note using the userId  /////////////////////

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
        try{
            // const newNote={};
        /////// Finding Note to be Deleted  //////////////////////////

        let note=await Notes.findById(req.params.id);
        if(!note){res.status(404).send("Not Found")};

        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        // note=await Notes.findByIdAndDelete(req.params.id,{$set:newNote},{new:true})
        note=await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been Deleted",note:note});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Server error' });
      }
    })


module.exports=router