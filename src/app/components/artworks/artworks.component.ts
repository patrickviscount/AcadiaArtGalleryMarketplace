import { Component, Input, OnInit } from '@angular/core';
import { ArtService } from 'src/app/art.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css'],
})
export class ArtworksComponent implements OnInit {
  artworksData: any;
  artworksImage: any;
  artistData: any;
  artWorkImagePath: string = '../../assets/';

  constructor(
    private artistService: ArtService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() artistId: any = 'all';
  @Input() artId: any;

  ngOnInit() {
    if (this.artistId === 'all') {
      this.getArtWorks();
    } else {
      this.getArtistArtworks(this.artistId);
    }
  }

  getArtistArtworks(artistId: any) {
    this.artistService.getArtWorkByArtistId(artistId).subscribe(
      (data) => {
        this.artworksData = data;
        console.log(this.artworksData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  placeOrder(id: any) {
    this.router.navigateByUrl(`/placeOrder/${id}`);
  }

  getArtWorks() {
    this.artistService.getArtWorks().subscribe(
      (data) => {
        this.artworksData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
