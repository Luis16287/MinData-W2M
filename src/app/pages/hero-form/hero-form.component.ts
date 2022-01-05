import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';
import { CropperComponent } from './components/image-cropper/cropper.component';

@Component({
    selector: 'hero-form',
    templateUrl: 'hero-form.component.html',
    styleUrls: ['hero-form.component.scss']
})
export class HeroFormComponent {
    public hero!: Hero;
    private heroId!: number;
    private lastHeroId!: number;
    public heroForm!: FormGroup;
    public title: string = 'Nuevo Heroe';
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private heroesService: HeroesService,
        private formBuilder: FormBuilder,
        protected dialog: MatDialog,
        private _snackBar: MatSnackBar,
    ) {
        this.heroId = this.route.snapshot.params.id;
        const lastHeroId = this.route.snapshot.paramMap.get('lastHeroId');
        this.lastHeroId = lastHeroId ? +lastHeroId : this.lastHeroId;
        if (this.heroId) {
            this.title = 'Cargando...';
            this.heroesService.getHeroesById(this.heroId).subscribe(hero => {
                this.hero = hero;
                this.buildForm();
                this.title = `Editando ${this.hero.name}`
            })
        } else {
            this.hero = {
                id: 0,
                name: '',
                photo: ''
            }
            this.buildForm();
        }
    }

    private buildForm() {
        this.heroForm = this.formBuilder.group({
            id: [this.hero?.id ?? this.lastHeroId + 1, [Validators.required]],
            name: [this.hero?.name.toUpperCase() ?? null, [Validators.required]],
            photo: [this.hero?.photo ?? null, [Validators.required]]
        });
    }

    fileChangeListener($event: any) {
        let image: any = new Image();
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();
        let that = this;
        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            that.openProfilePhotoModal(image);
        };

        myReader.readAsDataURL(file);
    }

    openProfilePhotoModal(imageUrl: any) {
        const dialogRef = this.dialog.open(CropperComponent, {
            width: '30%',
            disableClose: true,
            data: { file: imageUrl },
        });
        dialogRef.afterClosed().subscribe((url) => {
            if (url) {
                this.heroForm.get('photo')?.setValue(url);
            }
        });
    }

    confirm() {
        const rawValue = this.heroForm.getRawValue();
        this.hero.id = rawValue.id;
        this.hero.name = rawValue.name;
        this.hero.photo = rawValue.photo;
        this.save();
    }

    private save() {
        if (!this.heroId) {
            this.createHero();
        } else {
            this.editHero();
        }
    }

    private createHero(): void {
        this.title = `Creando al heroe ${this.hero.name}`;
        this.heroesService.createHero(this.hero).subscribe(newHero => {
            this.openSnackBar(`El heroe ${newHero?.name} fue creado correctamente`);
            this.goToHeroesList();
        })
    }

    private editHero(): void {
        this.title = `Actualizando al heroe ${this.hero.name}`;
        this.heroesService.editHero(this.hero).subscribe(editedHero => {
            this.openSnackBar(`El heroe ${editedHero?.name} fue editado correctamente`);
            this.goToHeroesList();
        })
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, undefined, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
        });
    }

    public goToHeroesList() {
        this.router.navigate([`app/heroes`]);
    }
}
