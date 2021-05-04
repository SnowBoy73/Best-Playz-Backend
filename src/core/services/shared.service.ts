import { Injectable } from '@nestjs/common';
import { ISharedService } from '../primary-ports/shared.service.interface';

@Injectable()
export class SharedService implements ISharedService {
  generateDateTimeNowString(): string {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();
    const hour = date_ob.getHours();
    const minute = date_ob.getMinutes();
    const second = date_ob.getSeconds();
    let mthZero = '';
    if (month < 10) mthZero = '0';
    let dateZero = '';
    if (date < 10) dateZero = '0';
    let hourZero = '';
    if (hour < 10) hourZero = '0';
    let minZero = '';
    if (minute < 10) minZero = '0';
    let secZero = '';
    if (second < 10) secZero = '0';
    return year + '-' + mthZero + month + '-' + dateZero + date + '@' + hourZero + hour + ':' + minZero + minute + ':' + secZero + second;
  }
}
