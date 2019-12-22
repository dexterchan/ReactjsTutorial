import React from "react";

const Input = props => {
  const { label, name, value, error, type, onChange } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        id={name}
        value={value}
        type={type}
        className="form-control"
        onChange={e => onChange(e)}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
