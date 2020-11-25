import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreRecordQuestion } from '../../../../_core/_model/score-record-question';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { SmeScoreRecordService } from '../../../../_core/_service/sme-score-record.service';

@Component({
  selector: 'app-sme-score-record-edit',
  templateUrl: './sme-score-record-edit.component.html',
  styleUrls: ['./sme-score-record-edit.component.scss']
})
export class SmeScoreRecordEditComponent implements OnInit, OnDestroy {
  questions: ScoreRecordQuestion[] = [];
  recordId: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smeScoreRecordService: SmeScoreRecordService,
    private alertify: AlertifyService
  ) { }

  ngOnDestroy(): void {
    const questionEditSME = [];
    this.smeScoreRecordService.changeQuestionEditSME(questionEditSME);
  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.recordId = param['recordId'];
    });
    this.smeScoreRecordService.currentQuestionEditSME.subscribe(res => {
      this.questions = res;
      console.log(this.questions);
    });
  }

  checkChange(item: ScoreRecordQuestion, number) {
    if (number === 0) {
      item.rating_0 = 1;
      item.rating_1 = 0;
      item.rating_2 = 0;
      item.rate_Na = 0;
      item.remark = null;
    }
    if (number === 1) {
      item.rating_0 = 0;
      item.rating_1 = 1;
      item.rating_2 = 0;
      item.rate_Na = 0;
      item.remark = null;
    }
    if (number === 2) {
      item.rating_0 = 0;
      item.rating_1 = 0;
      item.rating_2 = 1;
      item.rate_Na = 0;
      item.remark = null;
    }
    if (number === 3) {
      item.rating_0 = 0;
      item.rating_1 = 0;
      item.rating_2 = 0;
      item.rate_Na = 1;
      item.remark = null;
    }
  }

  back() {
    this.router.navigate(['/maintenance/sme-score-record/detail/' + this.recordId]);
  }

  save() {
    this.smeScoreRecordService.saveQuestionEditSME(this.questions).subscribe(() => {
      this.alertify.success('Save success');
      this.router.navigate(['/maintenance/sme-score-record/detail/' + this.recordId]);
    }, error => {
      this.alertify.error(error);
    });
  }
}
