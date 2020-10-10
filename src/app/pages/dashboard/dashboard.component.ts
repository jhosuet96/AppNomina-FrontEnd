import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { ServiceAppService } from 'app/Service/service-app.service';
import { employee } from 'app/model/employee';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
  form;
  objtempemp:employee;
  @Input() objEmp : employee = new employee();
  constructor(private service: ServiceAppService<employee>){}
    // private formBuilder: FormBuilder) { 
    //   this.form = formBuilder.group({
    //     nombre: ['', Validators.required],
    //     apellido: ['', Validators.required],
    //     sexo: ['', Validators.required],
    //     sueldoBruto: ['', Validators.required],
    //     activo: ['', Validators.required],    
    //   });
 


  addEmploye(form: NgForm){
    debugger
    if(confirm("Deseas agregar el registro?")){
      this.objtempemp = new employee();
      this.objtempemp.nombre = form.value.nombre;
      this.objtempemp.apellido = form.value.apellido;
      this.objtempemp.sexo = form.value.sexo;
      this.objtempemp.sueldobruto = form.value.sueldoBruto;
      this.objtempemp.activo = form.value.activo;
      this.service.Create("Employee","AddEmployee",this.objtempemp).subscribe(res=>{
        console.log(res);
        alert("Empleado Agregado");
        form.resetForm(form);
      },err=>{
        console.log(err);
      });
    }else{
      alert("Cancelado")
    }
  }
}
