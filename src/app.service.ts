import { Injectable } from '@nestjs/common';
import { parseAudit } from './parseAudit';

@Injectable()
export class AppService {
  getHello(): Promise<any> {
    return new Promise((resolve, reject) => {
      parseAudit((data) => {
        const arr: {x: string, y: number}[] = [];

        data.forEach((value, key) => {
          arr.push({x: key, y: value});
        });

        resolve(arr);
      });
    });
  }
}
