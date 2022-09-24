import { useState, useCallback } from "react";

// 추후에 반드시 고쳐야함!
const useToggle:any = (initialValue = true) => {
  const [hideDelete, setShowDelete] = useState(initialValue)
  
  const toggle = useCallback(() => setShowDelete(state => !state), []);

  return [hideDelete, toggle];
};

export default useToggle