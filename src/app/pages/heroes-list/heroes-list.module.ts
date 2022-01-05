// Angular Imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroesListComponent } from './heroes-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


// This Module's Components

const routes = [
    {
        path: 'heroes',
        component: HeroesListComponent
    },
    {
        path: 'heroes/new',
        component: HeroFormComponent
    },
    {
        path: 'heroes/:id',
        component: HeroFormComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        HeroesListComponent
    ],
    exports: [
        HeroesListComponent,
    ],
    providers: [
        HeroesService
    ]
})
export class HeroesListModule {

}
