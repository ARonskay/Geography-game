import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }


  getRandomCountries(count: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/all?fields=name,capital`).pipe(
      map((response) => {
        const countriesWithSingleCapital = response.map(country => {
          return {
            ...country,
            capital: country.capital[0] 
          };
        });
  
        const shuffledResponse = this.shuffleArray(countriesWithSingleCapital);
        const correctCountryIndex = Math.floor(Math.random() * count);
        const correctCountry = shuffledResponse[correctCountryIndex];
  
       
        shuffledResponse.splice(correctCountryIndex, 1);
  
       
        const randomCountries = this.shuffleArray(shuffledResponse).slice(0, count - 1);
  
       
        const randomIndex = Math.floor(Math.random() * count);
        randomCountries.splice(randomIndex, 0, correctCountry);
  
        console.log('Correct country:', correctCountry);
  
        return randomCountries;
      })
    );
  }
  
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
