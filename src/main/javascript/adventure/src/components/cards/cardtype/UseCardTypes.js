import {useEffect, useState} from "react";
import {getCardTypes} from "../../../utilities/client";

const useCardTypes = () => {
  const [cardTypes, setCardTypes] = useState([]);

  useEffect(() => {
    getCardTypes()
      .then(response => response.json())
      .then(json => setCardTypes(json));
  }, [setCardTypes]);

  return cardTypes;
}

export default useCardTypes;
