import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Hero } from "../models/heroe";

@Injectable({
    providedIn: 'root',
})

export class HeroesService {
    constructor(
        protected http: HttpClient,
    ) { }

    getFilteredHeroes(searchParam: string): Observable<Array<Hero>> {
        return this.http.get<Array<Hero>>(`${environment.mockServerUrl}/heroes?name_like=${searchParam}`).pipe(map((res) => res));
    }

    getHeroes(): Observable<Array<Hero>> {
        return this.http.get<Array<Hero>>(`${environment.mockServerUrl}/heroes`).pipe(map((res) => res));
    }

    getHeroesById(id: number): Observable<Hero> {
        return this.http.get<Hero>(`${environment.mockServerUrl}/heroes/${id}`).pipe(map((res) => res));
    }

    deleteHeroesById(id: number): Observable<number> {
        return this.http.delete<number>(`${environment.mockServerUrl}/heroes/${id}`).pipe(map((res) => res));
    }

    createHero(body: Hero): Observable<Hero> {
        return this.http.post<Hero>(`${environment.mockServerUrl}/heroes`, body, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', })
        }).pipe(map((res) => res));
    }

    editHero(hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(`${environment.mockServerUrl}/heroes/${hero.id}`, hero, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', })
        }).pipe(map((res) => res));
    }
}