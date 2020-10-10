import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NominaGenerated } from 'app/model/nominaGenerated';
import { JsonPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'upgrade-cmp',
    moduleId: module.id,
    templateUrl: 'upgrade.component.html'
})

export class UpgradeComponent implements OnInit{
    private endPoint : string = environment.endPoint;
    nominaGenerated: NominaGenerated[]=[];
    date: string;
    link: string;
    count: number;
    private modalService: NgbModal

    constructor(
        private httpClient: HttpClient
    ){}
    ngOnInit(){
    }

    getNominaGenerated(content,fecha: any){
        debugger
        this.date = fecha.value.fecha;
        //console.log(fecha.value.fecha);
        this.httpClient.get(this.endPoint +"Nomina/"+ `GetNominaGenerated?fecha=${fecha.value.fecha}`).subscribe((data: any[])=>{
            this.nominaGenerated = data;
            console.log(this.nominaGenerated );
            if(this.nominaGenerated.length < 1){
                alert("No hay Emplados con dias laborados a la fecha selecionada para generar el pago.");
            }
        });
    }

    getReport(content, fecha: any){
        debugger
        this.httpClient.get(this.endPoint +"Nomina/"+`reportPdf?fecha=${fecha}`).subscribe((data: any[])=>{
            this.getNominaGenerated(content,fecha);
            this.link = `https://localhost:44319/api/Nomina/reportPdf?fecha=${fecha}`;
            this.modalService.open(content, { size: 'lg' });
        });
    }

}
