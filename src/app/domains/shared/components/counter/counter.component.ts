import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = "";
  counter = signal(0);
  counterRef: number | undefined;

  constructor(){
    //NO ASYNC
    //BEFORE RENDER
    console.log("Este es el constructor");
    console.log("-".repeat(10));
  }

  ngOnChanges(changes: SimpleChanges){
    //BEFORE AND DURING RENDER
    console.log("ngOnChanges");
    console.log("-".repeat(10));
    console.log(changes);
    const duration = changes["duration"];
    if (duration && duration.currentValue !== duration.previousValue){
      this.doSomething();
    }
  }

  ngOnInit(){
    //AFTER RENDER
    //SOLO UNA VEZ
    //ASYNC, THEN, SUBS, FETCH, ...
    console.log("ngOnInit");
    console.log("-".repeat(10));
    console.log("duration =>", this.duration);
    console.log("message =>", this.message);
    this.counterRef = window.setInterval(()=>{
      this.counter.update(statePrev => statePrev + 1);
    }, 1000)
  }

  ngAfterViewInit(){
    //AFTER RENDER
    //PREGUNTA SI LOS HIJOS YA HAN SIDO RENDERIZADOS
    console.log("ngAfterViewInit");
    console.log("-".repeat(10));
  }

  ngOnDestroy(){
    //WHEN DESTROYED
    console.log("ngOnDestroy");
    console.log("-".repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething(){
    //ASYNC
    console.log("Cuando el duration cambie");
  }
}
