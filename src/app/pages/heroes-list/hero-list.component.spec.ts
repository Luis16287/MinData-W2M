import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroesListComponent } from './heroes-list.component';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('HeroesListComponent', () => {
    let component: HeroesListComponent;
    let fixture: ComponentFixture<HeroesListComponent>;
    let service: HeroesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroesListComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, MatDialogModule, MatSnackBarModule],
            providers: [
                HeroesService,
                { provide: Router, useClass: RouterMock },
            ]
        })
            .compileComponents();
        service = TestBed.inject(HeroesService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call method allHeroes', () => {
        const spy = spyOn(service, 'getHeroes').and.callThrough();
        service.getHeroes();
        expect(spy).toHaveBeenCalled();
    })

    it('should call method getFilteredHeroes', () => {
        const spy = spyOn(service, 'getFilteredHeroes').and.callThrough();
        service.getFilteredHeroes('man');
        expect(spy).toHaveBeenCalled();
    })

    it('should call addData', () => {
        spyOn(component, 'addData').and.callThrough();
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('button'));
        button.nativeElement.click();
        expect(component.addData).toHaveBeenCalled();
    });
});

class RouterMock {
    navigate() {
        return new Promise(resolve => resolve(true));
    }
}