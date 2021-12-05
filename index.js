// const express =require("express");
import express, { request, response } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();//all key and values put in env.process
console.log(process.env);


const app=express();
 const port=9000;
 const vechicals=[
    {
     "id": "100",
     "name": "Hyundai Creta",
     "rate": "10.20",
     "milage": "16.8 to 21.4 kmpl",
     "video": "https://www.youtube.com/embed/7ZukzunWBJg",
     "pic": "https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Creta/6775/1584360708758/front-left-side-47.jpg"
    },
    {
     "id": "101",
     "name": "Hyundai Venue",
     "rate": "6",
     "milage": "17.52 to 23.7 kmpl",
     "video": "https://www.youtube.com/embed/rhqzuF7Cyfs",
     "pic": "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Venue.jpg&w=730&h=484&q=75&c=1"
    },
    {
     "id": "102",
     "name": "Hyundai i20",
     "rate": 6.91,
     "milage": "9.65 to 25.0 kmpl",
     "video": "https://www.youtube.com/embed/GAezmllazOI",
     "pic": "https://cdn.motor1.com/images/mgl/9Mvlm/s1/2020-hyundai-i20.jpg"
    },
    {
     "id": "103",
     "name": "Hyundai Verna",
     "rate": 9.28,
     "milage": "17.7 to 25.0 kmpl",
     "video": "https://www.youtube.com/embed/wxln0Uk4F6s",
     "pic": "https://imgd.aeplcdn.com/0x0/n/cw/ec/41197/hyundai-verna-right-front-three-quarter7.jpeg"
    },
    {
     "id": "104",
     "name": "Hyundai Aura",
     "rate": 5.99,
     "milage": "CNG",
     "video": "https://www.youtube.com/embed/sQrlmW5QHLQ",
     "pic": "https://img.etimg.com/thumb/msid-72951090,width-640,resizemode-4,imgsize-121889/hyundai-aura-launched.jpg"
    },
    {
     "id": "105",
     "name": "Hyundai Alcazar",
     "rate": 16.3,
     "milage": "14.2 to 20.4 kmpl",
     "video": "https://www.youtube.com/embed/Eoop_2UPVbA",
     "pic": "https://images.firstpost.com/wp-content/uploads/2021/06/hyundai-alcazar-launched-in-india-at-starting-price-of-rs-16-30-lakh.jpg"
    },
    {
     "id": "106",
     "name": "Hyundai Santro",
     "rate": 4.76,
     "milage": "20.3 kmpl to 30.48kmpl",
     "video": "https://www.youtube.com/embed/cfFEKfGZwZI",
     "pic": "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/SantroModelImage.jpg&w=730&h=484&q=75&c=1"
    },
    {
     "id": "107",
     "name": "Hyundai Tucson",
     "rate": 22.69,
     "milage": "12.95 to 15.38 kmpl",
     "video": "https://www.youtube.com/embed/dXZ3RQQmmdU",
     "pic": "https://stat.overdrive.in/wp-content/odgallery/2020/07/57488_2020_Hyundai_Tucson_1.jpg"
    },
    {
     "id": "108",
     "name": "Hyundai Kona Electric",
     "rate": 23.79,
     "milage": "CNG",
     "video": "https://www.youtube.com/embed/xZl1LVOCh9A",
     "pic": "https://imgd.aeplcdn.com/1280x720/cw/ec/29580/Hyundai-Kona-Electric-Right-Front-Three-Quarter-162185.jpg?wm=0&q=85"
    },
    {
     "id": "109",
     "name": "Hyundai Elantra",
     "rate": 17.86,
     "milage": "14.59 to 14.62 kmpl",
     "video": "https://www.youtube.com/embed/wCGN2jWt1f4",
     "pic": "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20200318101234_2021-Hyundai-Elantra-front.jpg&w=700&q=90&c=1"
    },
    {
     "id": "110",
     "name": "Hyundai Grand i10 Nios",
     "rate": 5.28,
     "milage": "CNG",
     "video": "https://www.youtube.com/embed/vd2ylXNzhgc",
     "pic": "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=http://cms.haymarketindia.net/model/uploads/modelimages/Nios.jpg&w=730&h=484&q=75&c=1"
    },
    {
     "id": "111",
     "name": "Hyundai Xcent Prime",
     "rate": 6.4,
     "milage": "CNG",
     "video": "https://www.youtube.com/embed/CXEfDvnKaXs",
     "pic": "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/XCENT-Prime/pc/Hyundai%20Xcent-Gallery%202%20-%20PC%20-512x340.jpg"
    },
    {
     "id": "112",
     "name": "Hyundai i20 N Line",
     "rate": 9.84,
     "milage": "20.0 to 20.25 kmpl",
     "video": "https://www.youtube.com/embed/55nYUDT2j8I",
     "pic": "https://imgd.aeplcdn.com/664x374/n/cw/ec/100121/i20-n-line-exterior-right-front-three-quarter-12.jpeg?isig=0&q=85"
    }
   ]
   app.use(express.json());//middleware saying that we passing json data while posting
   
//    const MONGO_URL = "mongodb://localhost";
const MONGO_URL=process.env.MONGO_URL;
//    const MONGO_URL="mongodb+srv://deepa:welcome123@cluster0.bacm4.mongodb.net"
   //mongodb+srv://deepa:<password>@cluster0.bacm4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   
   
   async function Createconnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongodb connect");
    return client;
}
const client=await Createconnection();
 

app.get("/",(request,response)=>
 {
     response.send("hello🌎")

 });
 
 

 app.get("/vechicals",async (request,response)=>{
    console.log(request.query);
    const filter=request.query;
    console.log(filter);
    if(filter.rate){
        filter.rate=parseFloat(filter.rate);
    }   
const getbyparams=await getVechicalbyparams(filter);//convert to array
 response.send(getbyparams);
 });
 

 app.post("/vechicals",async (request,response)=>{
     const data=request.body;
     const result=await postVechical(data);
     response.send(result);
 })
 
 
 app.get("/vechicals/:id",async (request,response)=>{
 console.log(request.params);
const {id}=request.params;
// const getbyid=vechicals.find((mv)=>id===mv.id);
const getbyid=await getVechicalbyid(id);
getbyid
?response.send(getbyid)
:response.status(404).send({message: "no vechical found"});
});

app.put("/vechicals/:id",async (request,response)=>{
    console.log(request.params);
   const {id}=request.params;
   const data=request.body;
   const getbyid=await editVechicalbyid(id, data);
   const editedVechical=await getVechicalbyid(id);
   response.send(editedVechical);
   });


app.delete("/vechicals/:id",async (request,response)=>{
    console.log(request.params);
   const {id}=request.params;
   // const getbyid=vechicals.find((mv)=>id===mv.id);
   const result=await deleteVechicalbyid(id);
  result.deletedCount>0
   ?response.send(result)
   :response.status(404).send({message: "no vechical found"});
   });


 app.listen(port,()=>console.log("APP is started",port)); 


async function deleteVechicalbyid(id) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .deleteOne({ id: id });
}

async function editVechicalbyid(id, data) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .updateOne({ id: id }, { $set: data });
}

async function getVechicalbyid(id) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .findOne({ id: id });
}

async function postVechical(data) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .insertMany(data);
}

async function getVechicalbyparams(filter) {
    return await client
        .db("vechicals")
        .collection("vechicallist")
        .find(filter) // it is curser nothing but pagination
        .toArray();
}
  // has to be used to display in browser
  //to create package json