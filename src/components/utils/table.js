// React
import React from 'react';
import PropTypes from 'prop-types';

// Component
import BootstrapTable from 'react-bootstrap-table-next';

const WRAPPER_CLASS_NAME = 'generic-table-wrapper';
const ROW_CLASS_NAME = 'generic-table-row';
const ROW_CLASS_NAME_EXPANDING = "generic-table-row-expanding";
const ROW_CLASS_NAME_EXPANDED = "generic-table-row-expanded";

const propTypes = {
  keyField: PropTypes.string.isRequired,
  wrapperClasses: PropTypes.string,
  striped: PropTypes.bool,
  rowClasses: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  expandRow: PropTypes.shape({
    className: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    expanded: PropTypes.array
  })
};

const GenericTable = (props) => {
  let overridedProps = {
    ...props,
    wrapperClasses: `${WRAPPER_CLASS_NAME} ${props.wrapperClasses}`
  };

  const rowClassesHandler = (row, rowIndex) => {
    const isExpanded = props.expandRow && props.expandRow.expanded ? !!props.expandRow.expanded.find(id => id === row[props.keyField]) : false;
    let originalClassName = props.rowClasses;
    if (typeof props.rowClasses === 'function')
      originalClassName = props.rowClasses(row, rowIndex);
    return `${originalClassName || ""} ${ROW_CLASS_NAME} ${(rowIndex + 1) % 2 === 0 ? 'even' : 'odd'} ${isExpanded ? ROW_CLASS_NAME_EXPANDED : ''}`;
  };

  const expandRowClassesHandler = (isExpanded, row, rowIndex) => {
    let originalClassName = props.expandRow.className;
    if (typeof props.expandRow.className === 'function')
      originalClassName = props.expandRow.className(isExpanded, row, rowIndex);
    return `${originalClassName || ""} ${ROW_CLASS_NAME_EXPANDING} ${(rowIndex + 1) % 2 === 0 ? 'even' : 'odd'}`;
  };

  if (overridedProps.striped && overridedProps.expandRow) {
    overridedProps.expandRow = {
      ...props.expandRow,
      className: expandRowClassesHandler
    };
    overridedProps.rowClasses = rowClassesHandler;
  }

  return (
    <BootstrapTable {...overridedProps} />);
};

GenericTable.propTypes = propTypes;

export default GenericTable;
