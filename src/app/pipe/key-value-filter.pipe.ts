import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValueFilter',
  pure: false
})
export class KeyValueFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let objectArray;
    objectArray =  Object.keys(value).map(key => {
      let pair = { key:key,name:value[key]['name'] }
      // console.log(pair);
      return pair;
    });
    // console.log(objectArray.map(x=>x.key).sort((a,b)=>a>b?1:0));
    return objectArray;
  }

}
