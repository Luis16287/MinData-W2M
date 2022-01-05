import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';

@Component({
    selector: 'app-cropper',
    templateUrl: 'cropper.component.html',
    styleUrls: ['cropper.component.scss']
})
export class CropperComponent implements AfterViewInit {
    public imageData: any;
    public cropperSettings!: CropperSettings;

    @ViewChild('imgCropper', { static: false }) cropper!: ImageCropperComponent;

    constructor(
        public dialogRef: MatDialogRef<ImageCropperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.initCropper();
    }

    ngAfterViewInit(): void {
        this.cropper.setImage(this.data.file);
    }

    private initCropper() {
        this.cropperSettings = new CropperSettings();

        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 460;
        this.cropperSettings.canvasHeight = 400;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(0,0,0,.25)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings.rounded = true;

        this.imageData = {};
    }

    setRoundedMethod(value: boolean) {
        this.cropperSettings.rounded = value;
    }

    confirm() {
        this.dialogRef.close(this.imageData.image);
    }
}
