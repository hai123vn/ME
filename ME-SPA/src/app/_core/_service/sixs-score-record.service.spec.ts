/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SixsScoreRecordService } from './sixs-score-record.service';

describe('Service: SixsScoreRecord', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SixsScoreRecordService]
    });
  });

  it('should ...', inject([SixsScoreRecordService], (service: SixsScoreRecordService) => {
    expect(service).toBeTruthy();
  }));
});
