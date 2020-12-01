/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WaterSpidetScoreRecordService } from './water-spidet-score-record.service';

describe('Service: WaterSpidetScoreRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaterSpidetScoreRecordService]
    });
  });

  it('should ...', inject([WaterSpidetScoreRecordService], (service: WaterSpidetScoreRecordService) => {
    expect(service).toBeTruthy();
  }));
});
