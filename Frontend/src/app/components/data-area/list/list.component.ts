import { Component } from '@angular/core';
import { EventModel } from 'src/app/models/events-model';
import { TypeModel } from 'src/app/models/type-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

   public types:TypeModel[]=[];

   public events:EventModel[]=[];

   public constructor(private dataService: DataService) {  }

   public async ngOnInit(){
    try{
      this.types = await this.dataService.getAllTypes()
    }
    catch(err:any){
      alert(err.message)
    }
   }

   public async displayEvents(args: Event) {
    try{ 
      const selectElement = args.target as HTMLSelectElement
      const typeId = +selectElement.value
      this.events = await this.dataService.getEventByType(typeId)
    }

    catch(err:any){
         alert(err.message)
      }
  }

  public async deleteEvent(id : number): Promise<void> {
    try {
        const ok = window.confirm("Are you sure?");
        if (!ok) return;

        await this.dataService.deleteEvent(id);

        alert("The event has been deleted!");

        const index = this.events.findIndex(e => e.id === id);
        this.events.splice(index, 1);
    }
    catch (err: any) {
        alert(err.message);
    }
}

public isnotPassed(date:string): boolean {
    const now = new Date()
    const dateEvent = new Date(date)
    return dateEvent >= now;
}


}
