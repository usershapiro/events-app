import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { appConfig } from '../utils/app-config';
import { TypeModel } from '../models/type-model';
import { firstValueFrom } from "rxjs";
import { EventModel } from '../models/events-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   public constructor(private http:HttpClient) { }

  public async getAllTypes(): Promise<TypeModel[]> {
    const observable = this.http.get<TypeModel[]>(appConfig.typesUrl)
    const types = await firstValueFrom(observable)
    return types
  }

  public async getEventByType(typeId:number):Promise<EventModel[]> {
    const observable = this.http.get<EventModel[]>(appConfig.eventByTypeUrl + typeId)
    const events=  await firstValueFrom(observable)
    return events
  }

  public async addEvent(event: EventModel): Promise <void> {
    const observable = this.http.post<EventModel>(appConfig.addEventUrl,event);
    await firstValueFrom(observable)
}

 public async deleteEvent(id:number):Promise <void> {
  const observable =this.http.delete(appConfig.deleteUrl+id)
  await firstValueFrom(observable)
 }

}
