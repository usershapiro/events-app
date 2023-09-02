import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EventModel } from 'src/app/models/events-model';
import { TypeModel } from 'src/app/models/type-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  
  public types:TypeModel[]=[];

  public event = new EventModel();

  public constructor(private dataService: DataService , private router:Router) {  }

  public  async ngOnInit() {
    try{
           this.types = await this.dataService.getAllTypes();
    }
    catch(err:any){
      alert(err.message)
    }
  }

  public async send(){
    try{
      await this.dataService.addEvent(this.event)
      alert ("Event has been added")
      this.router.navigateByUrl("/list")
   }
   catch(err:any){

 }
  }
}
