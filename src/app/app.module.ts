import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoutesModule } from './pages/routes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const appRoutes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./pages/routes.module').then(m => m.RoutesModule)
  },
  {
    path: '**',
    redirectTo: 'app/heroes'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
