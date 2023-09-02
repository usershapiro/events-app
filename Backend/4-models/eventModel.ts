import Joi from "joi"

class EventModel {
   public id: number;
   public typeId: number;
   public date: string;
   public description: string;
   public address: string;
   public participants: number;
   
   public constructor (event:EventModel) {
    this.id = event.id;
    this.typeId = event.typeId ;
    this.date = event.date;
    this.description = event.description;
    this.address = event.address;
    this.participants = event.participants;
   
   }

   public static validationScheme = Joi.object({
      id:Joi.number().optional().positive().integer(),
      typeId:Joi.number().required(),
      date:Joi.string().required(),
      description:Joi.string().required(),
      address:Joi.string().required().min(2).max(150),
      participants:Joi.number().required()
   })
   public validate():string{
      const result = EventModel.validationScheme.validate(this)
      return result.error?.message;
   }

} 

export default EventModel