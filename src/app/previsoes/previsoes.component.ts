import { Component, OnInit } from '@angular/core';
import { PrevisoesService } from '../previsoes.service';
import { Previsao, PrevisaoBanco } from '../previsao';

@Component({
  selector: 'app-previsoes',
  templateUrl: './previsoes.component.html',
  styleUrls: ['./previsoes.component.css']
})

export class PrevisoesComponent implements OnInit {

  cidade:string;
  historico_previsoes:PrevisaoBanco[]
  minha_previsao:Previsao
  previsao_Banco:PrevisaoBanco
  data_previsao:string
  link:string

  constructor(private previsoesService:PrevisoesService) { }

  ngOnInit(): void {
    // this.previsoesService
    // .registrarComponenteComoInteressado().subscribe(previsoes => {
    //   console.log('estamos no componente', previsoes)
    // })
    
    this.previsoesService.historicoPrevisoes()
      .subscribe(resp => this.historico_previsoes = resp['items'])
     
  }

  pesquisar():void{
    this.previsoesService.obterPrevisoes(this.cidade);
    this.previsoesService.registrarComp().subscribe(previsoes =>{
    this.minha_previsao = new Previsao()  
    this.minha_previsao.name_city = previsoes['name'];
    this.minha_previsao.temp = previsoes['main']['temp'];
    this.minha_previsao.minTemp =previsoes['main']['temp_min'];
    this.minha_previsao.maxTemp = previsoes['main']['temp_max'];
    this.minha_previsao.icon = `http://openweathermap.org/img/wn/${previsoes['weather'][0]['icon']}@2x.png` ;
    this.minha_previsao.data_previsao = String(Date.now());

    })
  }


  adicionar():void{
    // this.data_previsao = `${this.data[0]}T${this.data[1]}Z`;
    this.previsao_Banco = new PrevisaoBanco()
    this.previsao_Banco.cidade = this.minha_previsao.name_city;
    this.previsao_Banco.data_previsao = this.data_previsao;
    this.previsao_Banco.link_previsao = `https://api.openweathermap.org/data/2.5/weather?q=${this.cidade},br&appid=39f24e48312f0c4e95891ff792b29c36&units=metric`;
    // this.previsoesService.enviarPrevisao(this.previsao_Banco)
    //   .subscribe(resp => console.log(resp));
    alert('Enviado com sucesso')
    }
  }

