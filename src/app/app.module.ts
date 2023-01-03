import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule,Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BioComponent } from './bio/bio.component';
import { CardCorsoComponent } from './card-corso/card-corso.component';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog/dialog-login/dialog-login.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { DetailCorsoComponent } from './pages/detail-corso/detail-corso.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { IncrementerComponent } from './incrementer/incrementer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SuPageComponent } from './pages/su-page/su-page.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {MatDividerModule} from '@angular/material/divider';

import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { DescrizioniComponent } from './descrizioni/descrizioni.component';
import { FooterComponent } from './footer/footer.component';

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
    FooterComponent
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
    SocialLoginModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '870651648800-pq8mbb5285trh0hfdlbfub2u24unkt8f.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
