import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISong } from '../interfaces/song.interface';
import { Observable, map } from 'rxjs';
import { ISongsResponse } from '../interfaces/songs-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private requestOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '09fc735343msh256a2985758f008p110d38jsn95c7b4ffb613',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  };
  constructor(private http: HttpClient) {}

  public fetchData(): Observable<ISong[]> {
    return this.http
      .get<ISongsResponse>(
        'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem',
        this.requestOptions
      )
      .pipe(map((response) => response.data));
  }
}
