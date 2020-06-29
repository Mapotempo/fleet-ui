// React
import React from 'react';
import PropTypes from 'prop-types';

// Component
import BootstrapTable from 'react-bootstrap-table-next';

const WRAPPER_CLASS_NAME = 'generic-table-wrapper';
const RAW_CLASS_NAME = 'generic-table-raw';

const propTypes = {
  wrapperClasses: PropTypes.string,
  striped: PropTypes.bool,
  rowClasses: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  expandRow: PropTypes.shape({
    className: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  })
};

const GenericTable = (props) => {
  let overridedProps = {
    ...props,
    wrapperClasses: `${WRAPPER_CLASS_NAME} ${props.wrapperClasses}`
  };

  const rowClassesHandler = (row, rowIndex) => {
    let originalClassName = props.rowClasses;
    if (typeof props.rowClasses === 'function')
      originalClassName = props.rowClasses(row, rowIndex);
    return `${originalClassName} ${RAW_CLASS_NAME} ${(rowIndex + 1) % 2 === 0 ? 'even' : 'odd'}`;
  };

  const expandRowClassesHandler = (isExpanded, row, rowIndex) => {
    let originalClassName = props.expandRow.className;
    if (typeof props.expandRow.className === 'function')
      originalClassName = props.expandRow.className(isExpanded, row, rowIndex);
    return `${originalClassName} generic-table-raw-expanding ${(rowIndex + 1) % 2 === 0 ? 'even' : 'odd'}`;
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
