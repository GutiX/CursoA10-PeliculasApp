import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { Cast, CretidResponse } from '../interfaces/credit-response';
import { catchError, map, tap } from 'rxjs/operators'
import { MovieDetailResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: '15700406219aab2809abf0a955b26b2a',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera(): Observable<Movie[]> {
    
    if ( this.cargando ) {
      return of([]);
    }

    this.cargando = true;
    
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      tap( () => {
        this.carteleraPage +=1;
        this.cargando = false;
      })
    );

  }

  buscarPeliculas( texto: string ):Observable<Movie[]> {

    const params = {...this.params, page: '1', query: texto };

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`, { 
      params
    }).pipe(
      map( resp => resp.results )
    );

  }

  getPeliculaDetalle( id: string ) {
    return this.http.get<MovieDetailResponse>(`${ this.baseUrl }/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null) )
    );
  }

  getCast( id: string ):Observable<Cast[]> {
    return this.http.get<CretidResponse>(`${ this.baseUrl }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast )
    ).pipe(
      catchError( err => of([]) )
    );
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

}
