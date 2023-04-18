import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private _apiKey: string = 'z2acq4qfM838hK8P0jcfVY1iGoDJmRsQ';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }
  private organizeHistory(tag: string): void {
    tag = tag.toLocaleLowerCase(); // Pasar todo a minuscula

    // Eliminar el tag repetido
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    // Insertar el nuevo tag al inicio
    this._tagsHistory.unshift(tag);

    // Manetener el arreglo limitado a 10
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    // Guardar el historial en el localStorage
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get<SearchResponse>(`${this._serviceUrl}/search?`, { params })
      .subscribe((resp) => (this.gifList = resp.data));
  }
}
