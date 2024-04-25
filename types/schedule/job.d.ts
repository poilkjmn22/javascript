export interface Job {
  createBy: string;
  createTime: string;
  updateBy?: any;
  updateTime?: any;
  remark: string;
  jobId: string;
  jobName: string;
  jobGroup: string;
  invokeTarget: string;
  cronExpression: string;
  misfirePolicy: string;
  concurrent: string;
  status: string;
  transId?: any;
  transName?: any;
  nextExecTime?: any;
  nextValidTime: string;
}
