import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { HeroesService } from "./heroes.service";
import { ALL_HEROES, FILTERED_HEROES, ONE_HERO } from "./heroes.service.mock";

describe('HeroesService', () => {
    let service: HeroesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(HeroesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call getFilteredHeroes', () => {
        const searchParam = 'man';
        service.getFilteredHeroes(searchParam).subscribe(response => {

            expect(response).toBeTruthy('No data returned');

            expect(response.length).toBe(5, 'Incorrect number of heroes');

            const hero = response.find(h => h.id === 1);

            expect(hero?.name).toBe('Batman');
        });

        const req = httpTestingController.expectOne(`${environment.mockServerUrl}/heroes?name_like=${searchParam}`);

        expect(req.request.method).toEqual('GET');

        req.flush(FILTERED_HEROES);

        httpTestingController.verify();
    })

    it('should call getHeroes', () => {
        service.getHeroes().subscribe(response => {

            expect(response).toBeTruthy('No data returned');

            expect(response.length).toBe(10, 'Incorrect number of heroes');

            const hero = response.find(h => h.id === 1);

            expect(hero?.name).toBe('Batman');
        });

        const req = httpTestingController.expectOne(`${environment.mockServerUrl}/heroes`);

        expect(req.request.method).toEqual('GET');

        req.flush(ALL_HEROES);

        httpTestingController.verify();
    })

    it('should call getHeroesById', () => {
        const id = 1;
        service.getHeroesById(id).subscribe(hero => {

            expect(hero).toBeTruthy('No data returned');

            expect(hero?.name).toBe('Batman');
        });

        const req = httpTestingController.expectOne(`${environment.mockServerUrl}/heroes/${id}`);

        expect(req.request.method).toEqual('GET');

        req.flush(ONE_HERO);

        httpTestingController.verify();
    })

    it('should call deleteHeroesById', () => {
        const id = 1;
        service.deleteHeroesById(id).subscribe(res => {
            expect(res).toBe(1);
        });

        const req = httpTestingController.expectOne(`${environment.mockServerUrl}/heroes/${id}`);

        expect(req.request.method).toBe('DELETE');

        expect(req.cancelled).toBeFalsy();

        expect(req.request.responseType).toEqual('json');

        req.flush(1);

        httpTestingController.verify();
    });

    it('should call editHero', () => {
        const hero = { id: 1, name: "updatedName", photo: "" };

        service.editHero(hero).subscribe(res => {
            expect(res.name).toBe('updatedName');
        });

        const req = httpTestingController.expectOne(`${environment.mockServerUrl}/heroes/${hero.id}`);

        expect(req.request.method).toBe('PUT');

        expect(req.request.body).toBe(hero);

        expect(req.cancelled).toBeFalsy();

        expect(req.request.responseType).toEqual('json');

        req.flush(hero);

        httpTestingController.verify();
    });

    it('should call createHero', () => {
        const hero = { id: 100, name: "NEW HERO", photo: "" };

        service.createHero(hero).subscribe(res => {
            expect(res.name).toBe('NEW HERO');
        });

        const req = httpTestingController.expectOne(`${environment.mockServerUrl}/heroes`);

        expect(req.request.method).toBe('POST');

        expect(req.request.body).toBe(hero);

        expect(req.cancelled).toBeFalsy();

        expect(req.request.responseType).toEqual('json');

        req.flush(hero);

        httpTestingController.verify();
    });
});