import { Pipe, PipeTransform } from '@angular/core';
import { MAX_LENGTH_OVERFLOW } from 'src/app/constants/app-constants';

@Pipe({
  name: 'textOverflow'
})
export class TextOverflowPipe implements PipeTransform {
  transform(value: string, maxLength = MAX_LENGTH_OVERFLOW): string {
    if (value.length <= maxLength) {
      return value;
    }

    return value.slice(0, maxLength) + '...';
  }
}
