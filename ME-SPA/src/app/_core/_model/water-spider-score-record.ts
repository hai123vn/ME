export interface AuditRateWaterSpider {
    recordId: string;
    auditDate: string;
    auditType: string;
    lineId: string;
    line_Name: string;
    loss: number;
    na: number | null;
    score: number;
    total: number;
    achieving: number;
    checkAnswerAllYet: boolean;
}