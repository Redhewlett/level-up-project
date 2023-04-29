import { Pipe, PipeTransform } from '@angular/core';
import { Equipment } from '../interfaces/items';

@Pipe({
  name: 'item',
})
export class ItemPipe implements PipeTransform {
  transform(item: Equipment, tier?: string): string {
    const propName = Object.keys(item.stat)[0];
    if (!tier) return `${item.name} (${propName}: ${item.stat[propName]})`;
    return `${item.name} (${propName}: ${item.stat[propName]}, ${tier} )`;
  }
}
