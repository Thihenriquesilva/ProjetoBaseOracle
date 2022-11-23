import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PrevisoesService } from '../previsoes.service';
import { Previsao } from '../previsao';

@Component({
  selector: 'app-previsoes',
  templateUrl: './previsoes.component.html',
  styleUrls: ['./previsoes.component.css']
})

export class PrevisoesComponent implements OnInit {

  historico_previsoes:any
  minha_previsao:Previsao
  cidade:string;
  data_previsao:string
  link_previsao:string

  constructor(private previsoesService:PrevisoesService) {
   }

  ngOnInit(): void {
    this.previsoesService.registrarComp()
        .subscribe((previsoes:any) =>{
        this.minha_previsao = new Previsao();
        this.minha_previsao.name_city = previsoes.city.name;
        this.minha_previsao.temp = previsoes.list[0].main.temp
        this.minha_previsao.minTemp =previsoes.list[0].main.temp_min;
        this.minha_previsao.maxTemp = previsoes.list[0].main.temp_max;
        this.minha_previsao.icon = `http://openweathermap.org/img/wn/${previsoes['list'][0]['weather'][0]['icon']}@2x.png`;
        this.minha_previsao.data_previsao = new Date(previsoes.list[0].dt_txt).toISOString();
      })
    
    this.atualizar()
  }


  pesquisar():void{

    if(this.cidade){
      this.previsoesService.obterPrevisoes(this.cidade);
    }
    else{
      alert('Digite alguma coisa')
    }
    
  }


  adicionar(){
    this.data_previsao = this.minha_previsao.data_previsao;
    this.link_previsao = this.minha_previsao.icon;
    this.previsoesService.enviarPrevisao(this.cidade, this.data_previsao, this.link_previsao)
    }

  atualizar(){ 
    this.previsoesService.historicoPrevisoes()
        .subscribe((resp:any)=> {
          this.historico_previsoes = resp.items
        })
    }
  }

