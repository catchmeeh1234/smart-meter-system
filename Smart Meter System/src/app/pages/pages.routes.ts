import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ViewConcessionairesComponent } from './view-concessionaires/view-concessionaires.component';
import { ViewSmartMetersComponent } from './view-smart-meters/view-smart-meters.component';
import { ReadSmartMetersComponent } from './read-smart-meters/read-smart-meters.component';
import { ViewRatesComponent } from './view-rates/view-rates.component';
import { WebSocketComponent } from './web-socket/web-socket.component';

const pagesRoutes: Routes = [
  	{ path: 'contact', component: ContactComponent ,data: { animation: 'contact' } },
  	{ path: 'about', component: AboutComponent ,data: { animation: 'about' }},
  	{ path: 'services', component: ServicesComponent ,data: { animation: 'services' }},
    { path: 'viewConcessionaires', component: ViewConcessionairesComponent ,data: { animation: 'viewConcessionaires' }},
    { path: 'viewSmartMeters', component: ViewSmartMetersComponent ,data: { animation: 'viewSmartMeters' }},
    { path: 'readSmartMeters', component: ReadSmartMetersComponent ,data: { animation: 'readSmartMeters' }},
    { path: 'viewRates', component: ViewRatesComponent ,data: { animation: 'viewRates' }},
    { path: 'websocket', component: WebSocketComponent ,data: { animation: 'websocket' }}
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class PagesRouterModule {}
