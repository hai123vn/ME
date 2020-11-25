import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { relativeTimeThreshold } from 'moment';
import { Select2OptionData } from 'ng-select2';
import { Select2 } from 'ng-select2-component';
import { AuditTypeD } from '../../../../_core/_model/audit-type-d';
import { Pagination, PaginationResult } from '../../../../_core/_model/pagination';
import { AlertifyService } from '../../../../_core/_service/alertify.service';
import { AuditTypeDService } from '../../../../_core/_service/audit-type-d.service';
import { AuditTypeService } from '../../../../_core/_service/audit-type.service';

@Component({
  selector: 'app-audit-type-d-list',
  templateUrl: './audit-type-d-list.component.html',
  styleUrls: ['./audit-type-d-list.component.scss']
})
export class AuditTypeDListComponent implements OnInit {
  auditTypes: AuditTypeD[];
  auditType: any = {};
  auditType1List: Array<Select2OptionData>;
  auditType2List: Array<Select2OptionData>;
  auditType1: string = "all";
  auditType2: string;
  checkSearch = '0';
  testVis: true;
  formData: any;
  pagination: Pagination;

  constructor(private auditTypeDService: AuditTypeDService,
    private auditTypeService: AuditTypeService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.auditTypeDService.currentAuditTypeD.subscribe(auditType => this.auditType = auditType);
    this.getAllAuditType1();
    this.route.data.subscribe(data => {
      console.log('Data',data);
      this.auditTypes = data['auditTypes'].result;
      this.pagination = data['auditTypes'].pagination;
    });
    console.log('pa: ', this.pagination);
    this.load();
  }


  load() {
    let object = {
      audit_Type_1: this.auditType1 === "all" ? '' : this.auditType1,
      audit_Type_2: this.auditType2
    };
    this.auditTypeDService.getAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginationResult<AuditTypeD[]>) => {
        this.auditTypes = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  searchAuditTypeD() {
    this.pagination.currentPage = 1;
    this.load();
  }

  add() {
    console.log(this.auditType);
    this.checkSearch = '0';
    this.auditType = {};
    this.auditTypeDService.changeAuditType(this.auditType);
    this.auditTypeDService.changeFlag('0');
    this.router.navigate(['/maintenance/audit-type-d/add']);
  }

  changeToEdit(auditType: AuditTypeD) {
    this.auditTypeDService.changeAuditType(auditType);
    this.auditTypeDService.changeFlag('1');
    this.router.navigate(['/maintenance/audit-type-d/update']);
  }

  delete(auditType: AuditTypeD) {
    this.alertify.confirm('Delete Audit Type', 'Are you sure want delete this Audit Type "' + auditType.audit_Type_ID +'  |  '+ +auditType.audit_Item_ID+'" ?', () => {
      this.auditTypeDService.delete(auditType.audit_Type_ID, auditType.audit_Item_ID).subscribe(() => {
        this.alertify.success('Delete success');
        this.load();
      }, error => {
        this.alertify.error(error);
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }

  getAllAuditType1() {
    this.auditTypeService.getAllAuditType1().subscribe(res => {
      this.auditType1List = res.map(item => {
        return { id: item, text: item };
      });
      this.auditType1List.unshift({ id: 'all', text: 'All' });
    });
  }

  changeVisiable(id: string, item: string) {
    this.auditTypeDService.changeVisible(id, item)
      .subscribe(() => {
        this.alertify.success('Change Visible success');
      }, error => {
        this.alertify.error(error);
      })
  }

  optionAuditType1() {
    const object = {
      audit_type_1: this.auditType1
    };
    if (this.auditType1 !== 'all') {
      this.auditTypeService.getAuditsByAuditType1(object).subscribe(res => {
        this.auditType2List = res.map(item => {
          return { id: item.audit_Type_2, text: item.audit_Type_2 };
        });
        this.auditType2 = this.auditType2List[0].id;
      });
    }
    else {
      this.auditType2List = [];
      this.auditType2 = '';
    }
  }
}
