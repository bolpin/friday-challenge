import React, { useState, useEffect } from 'react';
import useHttp from './use-http';
import { apiRoot } from "../config";

const useLookup = (resource) => {
  let values; 
  const { isLoading, httpError, sendRequest: fetchValues } = useHttp();
  
  useEffect(() => {
    fetchValues(
      {
        url: `${apiRoot}/${resource}.json`,
      }, result => values = result);
  }, []);

  return {
    values,
  }
}

export default useLookup;