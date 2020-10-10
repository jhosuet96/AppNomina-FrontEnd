import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Add Empleados',         icon:'nc-single-02',       class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
   // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
     { path: '/user',          title: 'Registro Nomina',      icon:'nc-money-coins',  class: '' },
    { path: '/table',         title: 'Registro Empleados',        icon:'nc-circle-10',    class: '' },
   // { path: '/typography',    title: 'Nominas Generadas',        icon:'nc-calendar-60', class: '' },
     { path: '/upgrade',       title: 'Nominas Generadas',    icon:'nc-calendar-60',  class: '' },//active-pro
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
