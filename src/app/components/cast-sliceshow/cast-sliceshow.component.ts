import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/credit-response';
import Swiper from 'swiper';


@Component({
  selector: 'app-cast-sliceshow',
  templateUrl: './cast-sliceshow.component.html',
  styleUrls: ['./cast-sliceshow.component.css']
})
export class CastSliceshowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[] = [];

  constructor() { }

  ngOnInit(): void {
    // console.log(this.cast);
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15
    });
  }

}
