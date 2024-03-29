import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RouterModule,Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BioComponent } from './components/bio/bio.component';
import { CardCorsoComponent } from './components/card-corso/card-corso.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogLoginComponent } from './components/dialog/dialog-login/dialog-login.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { DetailCorsoComponent } from './components/pages/detail-corso/detail-corso.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { IncrementerComponent } from './components/incrementer/incrementer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { SuPageComponent } from './components/pages/su-page/su-page.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import { DescrizioniComponent } from './components/descrizioni/descrizioni.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailCorsoComponent },
  { path: 'user', component: UserPageComponent },
  { path: 'su', component: SuPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BioComponent,
    CardCorsoComponent,
    DialogLoginComponent,
    DetailCorsoComponent,
    CalendarComponent,
    IncrementerComponent,
    UserPageComponent,
    SuPageComponent,
    DescrizioniComponent,
    FooterComponent,
    PrenotazioniComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    SlickCarouselModule,
    MatIconModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatDividerModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlatpickrModule.forRoot(),
    NgbModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    AngularEditorModule,
    MatBadgeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
