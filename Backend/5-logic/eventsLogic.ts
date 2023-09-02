import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import ProductModel from "../4-models/eventModel"
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/errorModel"
import TypesModel from "../4-models/typesModel"
import EventModel from "../4-models/eventModel"

async function getAllTypes() :Promise <TypesModel[]> {
    const sql = `SELECT * from types`
  const types = await dal.execute(sql)
  return types
}

async function getEventByType(typeId:number) :Promise <EventModel[]> {
const sql= `
SELECT E.*,T.type
FROM events AS E JOIN types AS T
 ON E.typeId = T.typeId
WHERE E.typeId = ?
`;
  const eventByType = await dal.execute(sql,[typeId])
  return eventByType
}
async function addEvent(event:EventModel):Promise <EventModel> {
  const error = event.validate();
  if(error) throw new ValidationErrorModel(error);
  const sql = `
   INSERT INTO events
  VALUES (DEFAULT,
     ?,
     ?,
     ?,
     ?,
     ?
    )`;
 
     const info:OkPacket = await dal.execute(sql,[event.typeId, event.date, event.description,event.address, event.participants])
     
     event.id  = info.insertId;

     return event;

} 



async function deleteEvent (id:number):Promise<void>
{ 
  const sql =`DELETE FROM events WHERE events.id = ?;`
  
  const info:OkPacket =await dal.execute(sql,[id])
  if(info.affectedRows ===0) throw new ResourceNotFoundErrorModel(id)
}

// async function updateProduct (product:ProductModel):Promise<ProductModel>{
//      const sql=`UPDATE products SET
//       productName = ?,
//       manufacturingDate = ?,
//       expireDate=?,
//       productCategoryId=?,
//       price=?
//       WHERE productId =?
//      `
//      const info:OkPacket = await dal.execute(sql,[product.productName,product.manufacturingDate,product.expireDate,product.productCategoryId,product.price,product.productId])
//     if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(product.productId)
//      return product
// } 
export default {
    getAllTypes,
    getEventByType,
    addEvent,
    deleteEvent
    // updateProduct
}