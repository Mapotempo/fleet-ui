// React
import React from 'react';
import PropTypes from 'prop-types';

// Component
import { Media } from 'react-bootstrap';

export const Entry = (props) => {
  let { icon, title, content } = props;
  return (
    <React.Fragment>
      <Media>
        {icon ? (<Media.Left align="middle">
          { icon }
        </Media.Left>) : null}
        <Media.Body>
          <div className="mtf-entry-title">
            { title }
          </div>
          <div className="mtf-entry-content">
            { content }
          </div>
        </Media.Body>
      </Media>
    </React.Fragment>
  );
};

Entry.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  content: PropTypes.any
};

