import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json, response } from 'express';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArtService {
  baseUrl = 'http://localhost:5000/artists';
  constructor(private http: HttpClient) {}

  getArtist(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.get(`http://localhost:5000/artist/${id}`, {
      headers: headers,
    });
  }

  getArtists(): Observable<any> {
    return this.http.get(`api/artists`, {
      responseType: 'json',
    });
  }

  getCheckUser(username:any, password:any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.get(`http://localhost:5000/user/${username}/${password}`, {
      headers: headers,
    });
  }

  updateArtist(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.put(`http://localhost:5000/artist`, data, {
      headers: headers,
    });
  }

  createArtist(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post('http://localhost:5000/artist', data, {
      headers: headers,
    });
  }

  deleteArtist(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.delete(`http://localhost:5000/artist/${id}`, {
      headers: headers,
    });
  }

  deleteArtwork(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.delete(`http://localhost:5000/artwork/${id}`, {
      headers: headers,
    });
  }

  getArtWorks(): Observable<any> {
    return this.http.get(`api/artworks`, {
      responseType: 'json',
    });
  }

  getArtWork(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.get(`http://localhost:5000/artwork/${id}`, {
      headers: headers,
    });
  }

  getArtWorkByArtistId(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.get(`http://localhost:5000/artist/artworks/${id}`, {
      headers: headers,
    });
  }
}
