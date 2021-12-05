import express from "express";
const router=express.Router();
import { getVechicalbyparams, postVechical, getVechicalbyid, editVechicalbyid, deleteVechicalbyid } from "../vechicalmethod.js";



router
.route("/").get(async (request,response)=>{
    console.log(request.query);
    const filter=request.query;
    console.log(filter);
    if(filter.rate){
        filter.rate=parseFloat(filter.rate);
    }   
const getbyparams=await getVechicalbyparams(filter);//convert to array
 response.send(getbyparams);
 })
 .post(async (request,response)=>{
    const data=request.body;
    const result=await postVechical(data);
    response.send(result);
});
 
 
 router.route("/:id")
 .get(async (request,response)=>{
 console.log(request.params);
const {id}=request.params;
// const getbyid=vechicals.find((mv)=>id===mv.id);
const getbyid=await getVechicalbyid(id);
getbyid
?response.send(getbyid)
:response.status(404).send({message: "no vechical found"});
})
.put(async (request,response)=>{
    console.log(request.params);
   const {id}=request.params;
   const data=request.body;
   const getbyid=await editVechicalbyid(id, data);
   const editedVechical=await getVechicalbyid(id);
   response.send(editedVechical);
   })
.delete(async (request,response)=>{
    console.log(request.params);
   const {id}=request.params;
   // const getbyid=vechicals.find((mv)=>id===mv.id);
   const result=await deleteVechicalbyid(id);
  result.deletedCount>0
   ?response.send(result)
   :response.status(404).send({message: "no vechical found"});
   });

// router.put("/:id",async (request,response)=>{
//     console.log(request.params);
//    const {id}=request.params;
//    const data=request.body;
//    const getbyid=await editVechicalbyid(id, data);
//    const editedVechical=await getVechicalbyid(id);
//    response.send(editedVechical);
//    });


//    router.delete("/:id",async (request,response)=>{
//     console.log(request.params);
//    const {id}=request.params;
//    // const getbyid=vechicals.find((mv)=>id===mv.id);
//    const result=await deleteVechicalbyid(id);
//   result.deletedCount>0
//    ?response.send(result)
//    :response.status(404).send({message: "no vechical found"});
//    });


   export const vechicalRouter=router;
