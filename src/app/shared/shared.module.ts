import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { MaterialModule } from "./material.module";
import { UppercaseDirective } from "./directives/uppercase-directive";

const COMPONENTS = [
    ConfirmDialogComponent,
    UppercaseDirective
];
@NgModule({
    declarations: [...COMPONENTS],
    exports: [
        ...COMPONENTS,
        MaterialModule
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule
    ],
    entryComponents: [MatDialogModule]
})
export class SharedModule { }
