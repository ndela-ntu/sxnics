import React from 'react';

interface DividerProps {
  thickness?: string;
  width?: string;
  margin?: string;
}

const Divider: React.FC<DividerProps> = ({
  thickness = '2px',
  width = '100%',
  margin = '1rem 0',
}) => {
  return (
    <hr
      style={{
        backgroundColor: 'white',
        height: thickness,
        width: width,
        margin: margin,
        border: 'none',
      }}
    />
  );
};

export default Divider;
