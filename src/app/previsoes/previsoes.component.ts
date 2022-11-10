import { Component, OnInit } from '@angular/core';
import { PrevisoesService } from '../previsoes.service';
@Component({
  selector: 'app-previsoes',
  templateUrl: './previsoes.component.html',
  styleUrls: ['./previsoes.component.css']
})

export class PrevisoesComponent implements OnInit {

  cidade:string;
  prev:Object;

  constructor(private previsoesService:PrevisoesService) { }

  ngOnInit(): void {
    this.previsoesService.registrarComp().subscribe(previsoes =>{
      console.log('Estamos no componente',previsoes)
      this.prev = previsoes;
    })
  }

  pesquisar():void{
    this.previsoesService.obterPrevisoes(this.cidade);
  }

}
