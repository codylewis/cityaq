import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CityCardsListComponent } from '../city/city-cards-list.component';
import { CitiesIndividualResponse } from '../core/api/openaq/cities/cities-individual-response.model';
import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { LocationsResponse } from '../core/api/openaq/locations/locations-response.model';
import { LocationsHandlerService } from '../core/handlers/locations-handler.service';
import { MessagingService } from '../shared/messaging/messaging.service';

import { SearchService } from './search.service';
import { SearchedCity } from './searched-city.model';

@Component({
    selector: 'aq-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    @Input() allCities: CitiesResponse = [];
    @Output() searchStarted: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() addSearchedCity: EventEmitter<SearchedCity> = new EventEmitter<SearchedCity>();
    initialSearch: boolean = false;
    filteredCities: Observable<CitiesResponse>;
    searchForm: FormGroup;
    searching: boolean = false;

    constructor(
        private fb: FormBuilder,
        private searchService: SearchService,
        private locationsHandlerService: LocationsHandlerService,
        private messagingService: MessagingService
    ) { };

    public ngOnInit(): void {
        this.newForm();
        this.filterCitiesOnInputChange();
    }

    public attemptSearch(): void {
        if (this.searching) return;
        this.searching = true;
        const cityName = this.searchService.validateSearchInput(
            this.searchForm.value['searchInput'],
            this.allCities
        );
        if (cityName) {
            this.search(cityName);
        } else {
            this.messagingService.error('Please select a valid city from the dropdown');
            this.searching = false;
        }
    }

    public setSearchStarted(): void {
        if (!this.initialSearch) {
            this.initialSearch = true;
            this.searchStarted.emit(true);
        }
    }
    
    private newForm(): void {
        this.searchForm = this.fb.group({
            searchInput: ['']
        });
    }

    private filterCitiesOnInputChange(): void {
        this.filteredCities = this.searchForm
            .get('searchInput')
            .valueChanges
            .startWith(null)
            .map(cityName => this.searchService.filterCities(cityName, this.allCities));
    }

    private search(cityName: string): void {
        const city = this.allCities.find(city => city.city === cityName);
        const country = city.country;
        this.locationsHandlerService
            .getLocationsByCityAndCountry(cityName, country)
            .subscribe(locations => {
                this.outputSearchedCity(city, locations)
            }, error => {
                this.handleLocationSearchError(error, cityName, city);
            });
    }

    private outputSearchedCity(city: CitiesIndividualResponse, locations: LocationsResponse): void {
        this.searching = false;
        this.clearSearchInput();
        const searchedCity: SearchedCity = city;
        searchedCity.locationsResponse = locations;
        this.addSearchedCity.emit(searchedCity);
    }

    private handleLocationSearchError(error: any, cityName: string, city: CitiesIndividualResponse): void {
        this.messagingService.error(
            `Failed to find data for ${cityName.toUpperCase()}`,
            `Search error for ${cityName}, ${city}: ${error}`
        );
    }

    private clearSearchInput(): void {
        this.searchForm.get('searchInput').setValue('');
    }
}