import {useEffect, useState} from 'react';
import {getAllEditions} from '../../utilities/client';

const useEditions = () => {
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    getAllEditions()
      .then(response => response.json())
      .then(setEditions);
  }, [setEditions]);

  // TODO: use memo?

  return editions;
};

export default useEditions;
