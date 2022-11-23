import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrevisoesService {
  private previsoesSubject = new Subject();

  private appid: string = '39f24e48312f0c4e95891ff792b29c36';

  private urlBd: string = 'https://gf12ad2ec957d47-databasep2previsoes.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/tb_previsoes/'
  constructor(private httpClient: HttpClient) { }

  obterPrevisoes(cidade: string): void {
    this.httpClient.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade},br&appid=${this.appid}&units=metric`)
      .subscribe(response => {
          this.previsoesSubject.next(response);
    });
  };

  registrarComp(){
    return this.previsoesSubject.asObservable();
  }

  enviarPrevisao(cidade:string, data:string, link:string){ 
    return this.httpClient.post(this.urlBd, {cidade:cidade, data_previsao:data, link_previsao:link})
    .subscribe(resp =>{
      console.log("Enviado")
      console.log(resp)
    } )
  }

  historicoPrevisoes(){
    return this.httpClient.get(this.urlBd)
  }

  
}
