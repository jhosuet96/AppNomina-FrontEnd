import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { employee } from 'app/model/employee';
import { ServiceAppService } from 'app/Service/service-app.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Nomina } from 'app/model/nomina';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    employee:employee[]=[];
    dataavailable: boolean = false;
    data: any;
    review_btn: boolean =false;
    date: boolean;
    link: string;
    count:any;
    private endPoint : string = environment.endPoint; //"https://localhost:44319/api/";
    constructor(
        private service: ServiceAppService<employee>,
        private serviceNomina: ServiceAppService<Nomina>,
        private modalService: NgbModal,
        private httpClient: HttpClient

    ){ }
   
    ngOnInit(){
      this.getAllActive();
    }
        
    getAllEmpleados(content,status: boolean){
      debugger
      this.date = status;
      //console.log(fecha.value.fecha);
      this.httpClient.get(this.endPoint +"Employee/"+ `GetAllEmpleados?status=${status}`).subscribe((data: any[])=>{
          this.employee = data;
          // var opened = confirm("Desea abrir el modal?");
          // if(opened){
          //    this.getReport(content,this.date);              
          // }
          //console.log(this.nominaGenerated);
      });
  }

  EgetReport(content, activo: boolean){
      debugger
      this.httpClient.get(this.endPoint +"Employee/"+`EreportPdf?activo=${activo}`).subscribe((data: any[])=>{
          this.getAllEmpleados(content,activo);
          this.link = `https://localhost:44319/api/Employee/EreportPdf?activo=${activo}`;
          this.modalService.open(content, { size: 'lg' });
      });
  }

    getAllActive(){
        this.service.getAll("Employee","GetAllActive").subscribe((data: employee[])=>{
              this.employee = data;
              console.log(this.employee);
              if(this.employee.length > 0){
                this.dataavailable = true;
                
              }else{
                this.dataavailable = false;
              }
            });
            //console.log("Array: " + this.employee);
    }

    editEmployee(form: NgForm){
      //debugger
      this.service.Update("Employee","UpdateEmployee",form.value).subscribe((data:any)=>{
        this.data = data;
        console.log(this.data.status);
        console.log(this.data.empleado);

        if(this.data.status){
          alert("Error al editar registro");
          this.getAllActive();
        }else{
          alert("Registro Editado");
          this.modalService.dismissAll();
          this.getAllActive();
        }
      });

    }

    openLgEmp(contentEmp, id: number){
      this.modalService.open(contentEmp, { size: 'lg' });
      this.service.getByID("Employee","GetById",id).subscribe((data:any)=>{
        this.data = data;
       // console.log("Hay Registros " + this.data.employee);
      },err => {
        console.log("Error: " + err)
      });
    }

    openLg(content, id: number) {   
      //debugger;
      this.serviceNomina.getByID("Nomina", "GetSueldoBruto", id).subscribe((data:any)=>{
        this.data = data; 
         this.count = this.data.isnominaCount;         
        if(this.count > 0){
          alert("Ya existe nomina para este Empleado.!");
          //console.log("Estoy dentro "+this.data.isnomina.length);
                  
        }else {
          //this.review_btn=true;
          this.modalService.open(content, { size: 'lg' });
          //alert("Modal abierto"); 
        }        
      },err => {
        console.log("Error: " + err)
      });
    }


    delete(id: number){
      
      if(confirm("Desea Activar o Inactivar este Empleado.!")){
        this.service.Delete("Employee","DeleteEmployee",id).subscribe(res=>{         
          alert("La accion se ejecuto con EXITO.!");
          this.getAllActive();
        });
      }
      
    }

    saveNomina(form: NgForm){
      this.serviceNomina.Create("Nomina","Add", form.value).subscribe(res=>{
        alert("Registro insertado");
        this.modalService.dismissAll();
      });
    }

  }
