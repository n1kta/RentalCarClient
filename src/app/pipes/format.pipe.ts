import { Pipe, PipeTransform } from '@angular/core';
import { FuelHelper } from '../helpers/fuel';
  
@Pipe({
    name: 'format'
})
export class FormatPipe implements PipeTransform {
  transform(value: number, args?: any): string {
    if (value === 1) {
        return 'Бензин';
    } else if (value === 2) {
        return 'Дизель';
    } else if (value === 3) {
        return 'Гібридний';
    } else if (value === 4) {
        return 'Електричний';
    } else {
        return '';
    }
  }
}