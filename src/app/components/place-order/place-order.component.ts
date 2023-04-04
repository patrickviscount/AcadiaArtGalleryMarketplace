import { Component, Input, OnInit } from '@angular/core';
import { ArtService } from 'src/app/art.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  artworkData: any;
  constructor(
    private artistService: ArtService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getArtWorkInfo(this.route.snapshot.paramMap.get('id'));
  }

  getArtWorkInfo(id: any) {
    this.artistService.getArtWork(id).subscribe(
      (data) => {
        this.artworkData = data;
        console.log(this.artworkData);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
