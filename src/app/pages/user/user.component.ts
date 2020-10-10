import { Component, OnInit } from '@angular/core';
import { ServiceAppService } from 'app/Service/service-app.service';
import { Nomina } from 'app/model/nomina';
import { employee } from 'app/model/employee';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { find } from 'rxjs/operators';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
    nomina: Nomina[]=[];
    dataavailable: boolean = false;
    data: any;
    search:any;
    private endPoint : string = environment.endPoint;

    constructor(
      private httpClient: HttpClient,
      private serviceNomina: ServiceAppService<Nomina>,
        //private modalService: NgbModal
    ){ }

    ngOnInit(){
        //this.getAll();
        this.getsearch(null);
    }

    getAll(){
        //debugger
        this.serviceNomina.getAll("Nomina","GetAllNominaEmployee").subscribe((data: Nomina[])=>{
            this.nomina = data;
            console.log(this.nomina);
            if(this.nomina.length > 0){
              this.dataavailable = true;
            }else{
              this.dataavailable = false;
            }
          });
    }

    getsearch(find? :string){
      this.httpClient.get(this.endPoint +"Nomina/"+`getNominaEmployeeSearch?search=${find}`).subscribe((data: Nomina[])=>{
      this.nomina = data;
      this.search = find;
      if(this.data.length > 0){
        this.dataavailable = true;        
      }else{
        this.dataavailable = false;  
      }



      }

      )};

}
