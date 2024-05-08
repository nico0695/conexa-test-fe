import React from 'react';

import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loaderSpinner}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
      >
        <g>
          <rect
            width="2"
            height="5"
            x="11"
            y="1"
            fill="currentColor"
            opacity="0.14"
          />
          <rect
            width="2"
            height="5"
            x="11"
            y="1"
            fill="currentColor"
            opacity="0.29"
            transform="rotate(30 12 12)"
          />
          <rect
            width="2"
            height="5"
            x="11"
            y="1"
            fill="currentColor"
            opacity="0.43"
            transform="rotate(60 12 12)"
          />
          <rect
            width="2"
            height="5"
            x="11"
            y="1"
            fill="currentColor"
            opacity="0.57"
            transform="rotate(90 12 12)"
          />
          <rect
            width="2"
            height="5"
            x="11"
            y="1"
            fill="currentColor"
            opacity="0.71"
            transform="rotate(120 12 12)"
          />
          <rect
            width="2"
            height="5"
            x="11"
            y="1"
            fill="currentColor"
            opacity="0.86"
            transform="rotate(150 12 12)"
          />
          <rect
            width="2"
            height="5"
            x="11"
            y="1"
            fill="currentColor"
            transform="rotate(180 12 12)"
          />
        </g>
      </svg>
    </div>
  );
};

export default Loading;
