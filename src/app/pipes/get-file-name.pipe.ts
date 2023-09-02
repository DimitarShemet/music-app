import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFileName',
})
export class GetFileNamePipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (value) {
      const splittedArr = value.split('/');
      return splittedArr[splittedArr.length - 1];
    }
    return null;
  }
}
