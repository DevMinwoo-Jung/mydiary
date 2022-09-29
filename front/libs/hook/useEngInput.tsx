import { useState, useCallback } from 'react';

export default (initialValue = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: { target: { value: string } }) => {
    setValue(e.target.value.replace(/[^A-Za-z0-9]/ig, ''));
  }, []);
  return [value, handler, setValue];
};
