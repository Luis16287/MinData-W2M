import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/heroe';
import { HeroesService } from 'src/app/services/heroes.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'heroes-list',
    templateUrl: 'heroes-list.component.html',
    styleUrls: ['heroes-list.component.scss']
})

export class HeroesListComponent implements AfterViewInit {
    public heroesList: Array<Hero> = [];
    public displayedColumns: string[] = ['id', 'name', 'photo', 'action'];
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    public dataSource: any;
    public form!: FormGroup;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private heroesService: HeroesService,
        private fb: FormBuilder,
        protected dialog: MatDialog,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {
        this.buildForm();
    }

    ngAfterViewInit() {
        this.allHeroes();
    }

    private allHeroes(): void {
        this.heroesService.getHeroes().subscribe(heroes => {
            this.heroesList = [...heroes];
            this.dataSource = new MatTableDataSource<Hero>(heroes);
            this.dataSource.paginator = this.paginator;
        }, error => {
            console.error(`Error obteninendo Heroes . Detalle ${JSON.stringify(error, null, 2)}`);
        })
    }

    private buildForm(): void {
        this.form = this.fb.group({
            search: [null],
        });
    }

    public addData(): void {
        this.router.navigate([`app/heroes/new`, { lastHeroId: this.heroesList.length }]);
    }

    public removeData(id: number): void {
        const heroToDelete = this.heroesList.find(h => h.id === id);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            minHeight: '200px',
            disableClose: true,
            data: { title: `¿Esta seguro de querer eliminar el heroe ${heroToDelete?.name}?` }
        });
        dialogRef.afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.heroesService.deleteHeroesById(id).subscribe(response => {
                    this.heroesList = this.heroesList.filter(h => h.id !== id);
                    this.dataSource = new MatTableDataSource<Hero>(this.heroesList);
                    this.dataSource.paginator = this.paginator;
                    this.openSnackBar(`El heroe ${heroToDelete?.name} fue eliminado correctamente`);
                });
            }
        });
    }

    public editData(id: number): void {
        this.router.navigate([`app/heroes/${id}`]);
    }

    public searchData() {
        const searchParam = this.form.get('search')?.value;
        if (searchParam && searchParam.length > 0) {
            this.heroesService.getFilteredHeroes(searchParam).subscribe(heroes => {
                this.heroesList = [...heroes];
                this.dataSource = new MatTableDataSource<Hero>(heroes);
                this.dataSource.paginator = this.paginator;
            });
        }

        if (!searchParam) {
            this.allHeroes();
        }
    }

    private openSnackBar(message: string) {
        this._snackBar.open(message, undefined, {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000
        });
    }

}
