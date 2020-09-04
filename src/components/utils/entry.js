// React
import React from 'react';
import PropTypes from 'prop-types';

// Component
import { Media } from 'react-bootstrap';

export const Entry = (props) => {
  let { icon, title, titleHelp, content, contentHelp } = props;
  return (
    <React.Fragment>
      <Media>
        {icon ? (<Media.Left align="middle">
          { icon }
        </Media.Left>) : null}
        <Media.Body>
          <div className="mtf-entry-title" title={titleHelp}>
            { title }
          </div>
          <div className="mtf-entry-content" title={contentHelp}>
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
  titleHelp: PropTypes.string,
  content: PropTypes.any,
  contentHelp: PropTypes.string
};
