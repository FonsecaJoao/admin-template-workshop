import { Gateway } from 'src/core/interfaces/gateway';
import { Project } from 'src/core/interfaces/project';
import { Report } from 'src/core/interfaces/report';
import { ReportFormattedData } from 'src/core/interfaces/report-formatted-data';
import { ReportPayload } from 'src/core/interfaces/report-payload';
import {
  ReportProjectData,
  ReportProjectRow,
} from 'src/core/interfaces/report-project-data';

export const adaptReportDateBasedOnFilterValues = (
  data: Report[],
  payload: ReportPayload,
  projectsData: Project[],
  gatewaysData: Gateway[]
): ReportFormattedData => {
  if (!payload.projectId && !payload.gatewayId) {
    return getFormattedDataWhenNoProjectsAndNoGateways(
      data,
      projectsData,
      gatewaysData
    );
  }

  if (payload.projectId === 'AllProjects') {
  }

  if (payload.gatewayId === 'AllGateways') {
  }

  return {};
};

const getFormattedDataWhenNoProjectsAndNoGateways = (
  reportData: Report[],
  projectsData: Project[],
  gatewaysData: Gateway[]
): ReportFormattedData => {
  let totalAmount = 0;
  const dataMap = new Map<string, ReportProjectData>();

  reportData.map((val) => {
    if (!dataMap.has(val.projectId)) {
      dataMap.set(val.projectId, {
        tableData: [getFormattedRow(val, gatewaysData)],
        totalProjectAmount: val.amount,
        projectName:
          projectsData.find((project) => project.projectId === val.projectId)
            ?.name || '',
      });
    } else {
      dataMap
        .get(val.projectId)!
        .tableData!.push(getFormattedRow(val, gatewaysData));
      dataMap.get(val.projectId)!.totalProjectAmount! += val.amount;
    }

    totalAmount += val.amount;
  });

  return {
    list: dataMap,
    totalAmount: Number(totalAmount.toFixed(2)),
    title: 'All projects | All gateways',
  };
};

const getFormattedRow = (
  report: Report,
  gatewaysData: Gateway[]
): ReportProjectRow => {
  return {
    created: report.created,
    gatewayId: report.gatewayId,
    gatewayName:
      gatewaysData.find((gateway) => gateway.gatewayId === report.gatewayId)
        ?.name || '',
    paymentId: report.paymentId.slice(-4),
    amount: report.amount,
  };
};
