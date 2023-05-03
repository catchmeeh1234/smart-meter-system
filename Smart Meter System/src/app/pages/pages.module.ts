import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRouterModule } from './pages.routes';

import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ViewConcessionairesComponent } from './view-concessionaires/view-concessionaires.component';

import { CoreModule } from '../core/core.module';
import { TablesModule } from '../tables/tables.module';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HighlightModule } from 'ngx-highlightjs';
import { TablesRouterModule } from '../tables/tables.router';
import {MatMenuModule} from '@angular/material/menu';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { ViewConcessionaireComponent } from './modal/view-concessionaire/view-concessionaire.component';
import { ViewWaterMeterComponent } from './modal/view-water-meter/view-water-meter.component';
import { RegisterComponent } from './register/register.component';
import { ViewSmartMetersComponent } from './view-smart-meters/view-smart-meters.component';
import { ReadSmartMetersComponent } from './read-smart-meters/read-smart-meters.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ViewRatesComponent } from './view-rates/view-rates.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { WebSocketComponent } from './web-socket/web-socket.component';
import { AddConcessionaireComponent } from './add-concessionaire/add-concessionaire.component';
import { AddSmartMeterComponent } from './modal/add-smart-meter/add-smart-meter.component';
import { ViewSelectedSmartMeterComponent } from './modal/view-selected-smart-meter/view-selected-smart-meter.component';
import { BindWaterMeterComponent } from './modal/bind-water-meter/bind-water-meter.component';
import { ConfirmationModalComponent } from './modal/confirmation-modal/confirmation-modal.component';


@NgModule({
    imports: [
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        CoreModule,
        PagesRouterModule,
        MatTableModule,
        MatTabsModule,
        MatStepperModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatTooltipModule,
        HighlightModule,
        TablesRouterModule,
        MatMenuModule,
        NgSelectModule,
        MatSelectModule,
        MatDialogModule,
        NgxChartsModule,
        DashboardWidgetModule,
        MatSnackBarModule,
      ],
    declarations: [
        ContactComponent,
        AboutComponent,
        ServicesComponent,
        ViewConcessionairesComponent,
        ModalComponent,
        ViewConcessionaireComponent,
        ViewWaterMeterComponent,
        RegisterComponent,
        ViewSmartMetersComponent,
        ReadSmartMetersComponent,
        ViewRatesComponent,
        WebSocketComponent,
        AddConcessionaireComponent,
        AddSmartMeterComponent,
        ViewSelectedSmartMeterComponent,
        BindWaterMeterComponent,
        ConfirmationModalComponent
    ],
    exports: [
    ],
    providers: [
    ],
    entryComponents: [ConfirmationModalComponent]
})
export class PagesModule {
}
