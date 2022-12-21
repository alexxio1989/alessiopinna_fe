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

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailCorsoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    BioComponent,
    CardCorsoComponent,
    DialogLoginComponent,
    DetailCorsoComponent
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
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
