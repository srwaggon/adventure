import {useEffect, useState} from "react";
import {getCardQualities} from "../../utilities/client";

const useQualities = () => {
  const [qualities, setQualities] = useState([]);

  useEffect(() => {
    getCardQualities()
      .then(response => response.json())
      .then(json => setQualities(json))
  }, [setQualities]);

  return qualities;
}

export default useQualities;
