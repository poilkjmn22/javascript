import React from 'react';

const Validator = (props) => {
  return (
    <div className={props.name}>
      {props.errorMsg ? (
        <p
          style={{ color: 'red', fontSize: '20px', fontWeight: 'bold' }}
          className="error-msg"
        >
          {props.errorMsg}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

Validator.defaultProps = {
  name: 'validator-base',
};
export default Validator;
