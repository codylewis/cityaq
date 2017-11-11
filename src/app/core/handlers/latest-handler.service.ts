import { Injectable } from '@angular/core';
import { LatestApi } from '../api/openaq/latest/latest.api';
import { LatestRequestModel } from '../api/openaq/latest/latest-request.model';
import { LatestResponseModel } from '../api/openaq/latest/latest-response.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LatestHandlerService {
    constructor(private latestApi: LatestApi) {};

    getLatestByCityAndCountry(cityName: string, country: string): Observable<LatestResponseModel> {
        let request: LatestRequestModel = {
            city: cityName,
            country: country
        }
        return this.latestApi.getLatest(request);        
    }
}