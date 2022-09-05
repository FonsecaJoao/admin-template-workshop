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
  switch (true) {
    case !payload.projectId && !payload.gatewayId:
      return getFormattedDataWhenNoProjectsAndNoGateways(
        data,
        projectsData,
        gatewaysData
      );
    case !!payload.projectId && !payload.gatewayId:
      return {
        list: new Map().set('projectId', {
          tableData: [],
          totalProjectAmount: 0,
          projectName: '',
        }),
        totalAmount: 0,
        title: 'Not implemented',
      };
    case !payload.projectId && !!payload.gatewayId:
      return {
        list: new Map().set('projectId', {
          tableData: [],
          totalProjectAmount: 0,
          projectName: '',
        }),
        totalAmount: 0,
        title: 'Not implemented',
      };
    default:
      return getFormattedDataWhenProjectsAndGatewaysExist(
        data,
        projectsData,
        gatewaysData
      );
  }
};

const getFormattedDataWhenProjectsAndGatewaysExist = (
  reportData: Report[],
  projectsData: Project[],
  gatewaysData: Gateway[]
): ReportFormattedData => {
  const projectName =
    projectsData.find((p) => p.projectId === reportData[0].projectId)?.name ||
    '';
  const gatewayName =
    gatewaysData.find((g) => g.gatewayId === reportData[0].gatewayId)?.name ||
    '';

  const { totalAmount, map } = populateMap(
    reportData,
    projectsData,
    gatewaysData
  );

  return {
    list: map,
    totalAmount: Number(totalAmount.toFixed(2)),
    title: projectName + ' | ' + gatewayName,
  };
};

const getFormattedDataWhenNoProjectsAndNoGateways = (
  reportData: Report[],
  projectsData: Project[],
  gatewaysData: Gateway[]
): ReportFormattedData => {
  const { totalAmount, map } = populateMap(
    reportData,
    projectsData,
    gatewaysData
  );

  return {
    list: map,
    totalAmount: Number(totalAmount.toFixed(2)),
    title: 'All projects | All gateways',
  };
};

const populateMap = (
  reportData: Report[],
  projectsData: Project[],
  gatewaysData: Gateway[]
): { totalAmount: number; map: Map<string, ReportProjectData> } => {
  let totalAmount = 0;
  let dataMap = new Map<string, ReportProjectData>();

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
    totalAmount,
    map: dataMap,
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
