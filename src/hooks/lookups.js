import React, { useState } from 'react';
import useHttp from './use-http';
import { apiRoot } from '../config';

const LookupsProvider = ({children}) => {
  const [players, ] = useState([]);

  const { isLoading, httpError, sendRequest: fetchValues } = useHttp();
  
  useEffect(() => {
    fetchValues(
      {
        url: `${apiRoot}/players.json`,
      }, result => setPlayers(result));
  }, []);

  return(
    <LookupsContext.Provider value={{ players }}>
      {children}
    </LookupsContext.Provider>
  )
}

export default LookupsProvider;