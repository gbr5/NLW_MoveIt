import React, { ButtonHTMLAttributes, HTMLAttributes, useCallback, useState } from 'react';

import { FiLoader } from 'react-icons/fi';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: React.FC<IProps> = ({ children, loading, ...rest }: IProps) => {
  return (
      <button
        type="button"
        {...rest}
      >
        {loading ? <FiLoader /> : children}
      </button>
  );
};

export default Button;