import { Pipe, PipeTransform } from '@angular/core';
import { logging } from 'protractor';

@Pipe({
  name: 'filterdestinos'
})
export class FilterdestinosPipe implements PipeTransform {
  aux:any=[]
  transform(value: any, arg: any):any{
    
    
    if(arg ==='' || arg.length<3)
    return value;
    let resultadoPots:any=[];
    let resul:any=[];
    for(const post of value){
      if(post.origenbus.toLowerCase().indexOf(arg.toLowerCase())>-1){
        
        //resultadoPots.push(post);
        resul.push(post)
      };
    };
    
    const dest:any=[]
    for(let i=0;i<resul.length;i++){

      if (!resultadoPots.includes(resul[i].destinobus)) {

        resultadoPots.push(resul[i].destinobus);

      }
      
      
    }
    
    return resultadoPots
  }

}

