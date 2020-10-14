import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { MovieDetailResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Cast } from 'src/app/interfaces/credit-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieDetailResponse;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute, 
                private peliculasService: PeliculasService,
                private location: Location,
                private router: Router ) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasService.getPeliculaDetalle( id ),
      this.peliculasService.getCast( id )
    ]).subscribe( ([movie, cast]) => {
      if ( !movie ){
        this.router.navigateByUrl('/home');
        return;
      }

      this.movie = movie;
      this.cast = cast.filter(actor => actor.profile_path !== null);
    });

    // Lo anterior es como esto comentado
    // this.peliculasService.getPeliculaDetalle( id ).subscribe( resp => {
    //   if ( !resp ){
    //     this.router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.movie = resp;
    // });

    // this.peliculasService.getCast( id ).subscribe( resp => {
    //   this.cast = resp.filter(actor => actor.profile_path !== null);
    // });

  }

  regresar() {
    this.location.back()
  }

}
