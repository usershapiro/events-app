import express, { NextFunction, Request, Response, request } from "express";
import productLogic from "../5-logic/eventsLogic";
import ProductModel from "../4-models/eventModel";
import EventModel from "../4-models/eventModel";

const router = express.Router()
//listen on http://localhost:3001/api/types        
router.get("/types" , async(request:Request , response:Response , next:NextFunction)=>{
try{
   const types = await productLogic.getAllTypes()
   response.json(types)


}
catch(err:any){
    next(err)
}
})

//listen on http://localhost:3001/api/event-by-type/:typeId
router.get("/event-by-type/:typeId",async(request:Request , response:Response , next:NextFunction)=>{
   try{
    const typeId = +request.params.typeId
    const productByCategory = await productLogic.getEventByType(typeId)
    response.json(productByCategory)
   }
   catch(err:any){
    next(err);
   }
   
})

//listen on http://localhost:3001/api/events
router.post("/events" , async(request:Request , response:Response , next:NextFunction)=>{
  try{
    const event = new EventModel(request.body);
    const addedProduct = await productLogic.addEvent(event);
    response.status(201).json(addedProduct);
  }
  catch(err:any){
    next(err);
  }
  
    
}) 

//listen on http://localhost:3001/api/delete-event/:id
router.delete("/delete-event/:id",async(request:Request , response:Response , next:NextFunction)=>{
 try{
      const id = +request.params.id
      await productLogic.deleteEvent(id)
      response.json(204)
 }
 catch(err:any){
    next(err)
 }
})

// //listen on http://localhost:3001/api/edit-product/:productId
// router.put("/edit-product/:productId",async(request:Request,response:Response,next:NextFunction)=>{
// try{
//   const product= new ProductModel(request.body);
//   const updateProduct = await productLogic.updateProduct(product);
//     response.json(updateProduct);
// }
// catch(err:any){
// next(err)
// }

// })


export default router