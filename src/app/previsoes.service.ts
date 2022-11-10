import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrevisoesService {
  //Observable do tipo push
  //
  private previsoesSubject = new Subject();

  private appid: string = '39f24e48312f0c4e95891ff792b29c36';
  private url: string = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private httpClient: HttpClient) { }

  obterPrevisoes(cidade: string): void {
    this.url =
      `${this.url}?q=${cidade}&appid=${this.appid}`;
    this.httpClient.get(this.url).subscribe(response => {
      this.previsoesSubject.next(response);
    });
  };

  registrarComp(){
    return this.previsoesSubject.asObservable();
  }
}
