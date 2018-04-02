// Copyright (c) Microsoft. All rights reserved.

import React from "react";

import {
  SeverityRenderer,
  RuleStatusRenderer,
  CountRenderer,
  LastTriggerRenderer,
  LinkRenderer
} from 'components/shared/cellRenderers';
export const LAST_TRIGGER_DEFAULT_WIDTH = 310;

export const checkboxParams = {
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true
};

export const rulesColumnDefs = {
  ruleName: {
    headerName: 'rules.grid.ruleName',
    field: 'name',
    filter: 'text'
  },
  description: {
    headerName: 'rules.grid.description',
    field: 'description',
    filter: 'text'
  },
  severity: {
    headerName: 'rules.grid.severity',
    field: 'severity',
    filter: 'text',
    cellRendererFramework: SeverityRenderer
  },
  severityIconOnly: {
    headerName: 'rules.grid.severity',
    field: 'severity',
    filter: 'text',
    cellRendererFramework: props => <SeverityRenderer {...props} iconOnly={true} />
  },
  filter: {
    headerName: 'rules.grid.filter',
    field: 'groupId',
    filter: 'text'
  },
  trigger: {
    headerName: 'rules.grid.trigger',
    field: 'conditions',
    filter: 'text',
    valueFormatter: ({ value, context: { t } }) => {
      if (Array.isArray(value) && value.length) {
        return value.map(trigger => trigger['field'] || t('rules.grid.unknown')).join(' & ');
      }
      return t('rules.grid.unknown');
    }
  },
  notificationType: {
    headerName: 'rules.grid.notificationType',
    field: 'type',
    filter: 'text',
    valueFormatter: ({ value, context: { t } }) => value || t('rules.grid.maintenanceLog')
  },
  status: {
    headerName: 'rules.grid.status',
    field: 'enabled',
    filter: 'text',
    cellRendererFramework: RuleStatusRenderer
  },
  alarmStatus: {
    headerName: 'rules.grid.status',
    field: 'status',
    filter: 'text'
  },
  count: {
    headerName: 'rules.grid.count',
    field: 'count',
    cellRendererFramework: CountRenderer
  },
  lastTrigger: {
    headerName: 'rules.grid.lastTrigger',
    field: 'lastTrigger',
    cellRendererFramework: LastTriggerRenderer,
    width: LAST_TRIGGER_DEFAULT_WIDTH
  },
  explore: {
    headerName: 'rules.grid.explore',
    field: 'ruleId',
    cellRendererFramework: props => <LinkRenderer {...props} to={`/maintenance/rule/${props.value}`} />
  },
};

export const defaultRulesGridProps = {
  enableColResize: true,
  multiSelect: true,
  paginationPageSize: 20,
  rowSelection: 'multiple',
  suppressCellSelection: true,
  suppressClickEdit: true,
  suppressRowClickSelection: true
};