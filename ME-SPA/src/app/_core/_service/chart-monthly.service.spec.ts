/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartMonthlyService } from './chart-monthly.service';

describe('Service: ChartMonthly', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartMonthlyService]
    });
  });

  it('should ...', inject([ChartMonthlyService], (service: ChartMonthlyService) => {
    expect(service).toBeTruthy();
  }));
});
