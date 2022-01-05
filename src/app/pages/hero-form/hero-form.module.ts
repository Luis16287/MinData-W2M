// Angular Imports
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageCropperModule } from 'ngx-img-cropper';
import { HeroesService } from 'src/app/services/heroes.service';
import { CropperComponent } from './components/image-cropper/cropper.component';

// This Module's Components
import { HeroFormComponent } from './hero-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ImageCropperModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        HeroFormComponent,
        CropperComponent
    ],
    exports: [
        HeroFormComponent,
    ],
    entryComponents: [CropperComponent],
    providers: [HeroesService]
})
export class HeroFormModule {

}
