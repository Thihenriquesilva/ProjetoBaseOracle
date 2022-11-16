import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';

import { PrevisaoBanco } from './previsao';

@Injectable({
  providedIn: 'root'
})
export class PrevisoesService {
  //Observable do tipo push
  //
  private previsoesSubject = new Subject();

  private appid: string = '39f24e48312f0c4e95891ff792b29c36';
  // private url: string = 'https://api.openweathermap.org/data/2.5/forecast';
  // private url: string = 'https://api.openweathermap.org/data/2.5/';

  private urlBd: string = 'https://gf12ad2ec957d47-databasep2previsoes.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/tb_previsoes/'
  constructor(private httpClient: HttpClient) { }

  obterPrevisoes(cidade: string): void {
    //this.url =
      // `${this.url}weather?q=${cidade},br&appid=${this.appid}&units=metric`;
    this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},brbr&appid=${this.appid}&units=metric`).subscribe(response => {
    // this.httpClient.get(this.url).subscribe(response => {
      this.previsoesSubject.next(response);
    });
  };

  registrarComp(){
    return this.previsoesSubject.asObservable();
  }

  enviarPrevisao(previsao:PrevisaoBanco):Observable<PrevisaoBanco>{ 
    return this.httpClient.post<PrevisaoBanco>(this.urlBd,previsao)
  }

  historicoPrevisoes():Observable<PrevisaoBanco[]>{
    return this.httpClient.get<PrevisaoBanco[]>(this.urlBd)
  }

  
}
