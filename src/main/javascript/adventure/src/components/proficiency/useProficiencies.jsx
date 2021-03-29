import {useEffect, useState} from 'react';
import {getAllProficiencies} from '../../utilities/client';

const useProficiencies = () => {
  const [proficiencies, setProficiencies] = useState([]);

  useEffect(() => {
    getAllProficiencies()
      .then(response => response.json())
      .then(setProficiencies);
  }, [setProficiencies]);

  return proficiencies;
};

export default useProficiencies;