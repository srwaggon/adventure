import {Box, IconButton, InputAdornment, MenuItem} from "@mui/material";
import CardTypeSelect from "./CardTypeSelect";
import React, {useEffect, useState} from "react";
import CardQualitySelect from "./CardQualitySelect";
import EditionSelect from "./EditionSelect";
import {useSearchParams} from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import AlcheimTextField from "../input/AlcheimTextField";
import useDebounce from "../input/useDebounce";

const filterName = (name) => (card) => (card.name || "").toLowerCase().includes(name);

const filterText = (text) => (card) => (card.body || "").toLowerCase().includes(text);

const filterType = (type) => (card) => "any" === type || type === card.type;

const filterQuality = (quality) => (card) =>
  "any" === quality
  || ("none" === quality && card.quality === null)
  || quality === card.quality;

const filterEdition = (editionId) => (card) =>
  "any" === editionId
  || ("none" === editionId && card.editionId === null)
  || editionId === card.editionId;

const NameFilter = ({onFilterName, value}) => {
  const [state_value, setStateValue] = useState(value);
  const debouncedChange = useDebounce(onFilterName, 500);
  const setValue = (value) => {
    setStateValue(value);
    debouncedChange(value);
  };
  const onChange = (event) => setValue(event.target.value);
  return (<AlcheimTextField
    label="Name"
    value={state_value}
    onChange={onChange}
    InputProps={state_value && {
      endAdornment: <InputAdornment position="end">
        <IconButton
          aria-label="clear"
          onClick={() => setValue("")}
          edge="end"
        >
          <ClearIcon/>
        </IconButton>
      </InputAdornment>
    }}
  />);
};

const TextFilter = ({onFilterText, value}) => {
  const [stateValue, setStateValue] = useState(value);
  const debouncedChange = useDebounce(onFilterText, 500);
  const setValue = (value) => {
    setStateValue(value);
    debouncedChange(value);
  }
  const onChange = (event) => setValue(event.target.value);
  return (<AlcheimTextField
    label="Text"
    value={stateValue}
    onChange={onChange}
    InputProps={stateValue && {
      endAdornment: <InputAdornment position="end">
        <IconButton
          aria-label="clear"
          onClick={() => setValue("")}
          edge="end"
        >
          <ClearIcon/>
        </IconButton>
      </InputAdornment>
    }}
  />);
}
const CardFilter = ({setFilterFunc}) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const getName = () => searchParams.get("name") || "";

  const getText = () => searchParams.get("text") || "";

  const getType = () => searchParams.get("type") || "any";

  const getQuality = () => searchParams.get("quality") || "any";

  const getEdition = () => searchParams.get("edition") || "any";

  const setParams = (params = {}) => {
    setSearchParams({
                      name: params && params.name !== undefined && params.name !== null
                            ? params.name : getName(),
                      text: params && params.text !== undefined && params.name !== null
                            ? params.text : getText(),
                      type: (params && params.type) || getType(),
                      quality: (params && params.quality) || getQuality(),
                      edition: (params && params.edition) || getEdition(),
                    });
  };

  useEffect(() => {
    setParams({});
  }, []);

  useEffect(() => {
    setFilterFunc(() => (cards) =>
      cards
        .filter(filterName(getName().toLowerCase()))
        .filter(filterText(getText().toLowerCase()))
        .filter(filterType(getType()))
        .filter(filterQuality(getQuality()))
        .filter(filterEdition(getEdition()))
    );
  }, [searchParams]);

  const setName = name => {
    setParams({name});
  };

  const setText = text => {
    setParams({text});
  };

  const setType = type => {
    setParams({type});
  };

  const setQuality = (quality) => {
    const qualityId = quality === "none" ? "none"
                                         : quality === "any" ? "any"
                                                             : quality;
    setParams({quality: qualityId});
  };

  const setEdition = edition => {
    const editionId = edition === "none" ? "none"
                                         : edition === "any" ? "any"
                                                             : edition.id;
    setParams({edition: editionId});
  };

  return <Box>
    <Box display={"flex"}
         flexWrap={"wrap"}
         justifyContent={"center"}
         gap={1}
    >
      <Box display={"flex"}
           flexWrap={"wrap"}
           justifyContent={"center"}
           minWidth={210}
           maxWidth={750}
           gap={1}
      >
        <Box display={"flex"} minWidth={210} maxWidth={250}>
          <NameFilter
            onFilterName={setName}
            value={getName()}
          />
        </Box>

        <Box display={"flex"} minWidth={210} maxWidth={250}>
          <TextFilter
            onFilterText={setText}
            value={getText()}
          />
        </Box>
      </Box>

      <Box display={"flex"}
           flexWrap={"wrap"}
           justifyContent={"center"}
           gap={1}
           minWidth={210}
           maxWidth={750}
      >
        <Box display={"flex"} minWidth={210} maxWidth={250}>
          <CardQualitySelect
            value={getQuality()}
            onSelect={setQuality}>
            <MenuItem value={"any"}>Any</MenuItem>
            <MenuItem value={"none"}>None</MenuItem>
          </CardQualitySelect>
        </Box>

        <Box display={"flex"} minWidth={210} maxWidth={250}>
          <CardTypeSelect
            value={getType()}
            onSelect={setType}>
            <MenuItem value={"any"}>Any</MenuItem>
          </CardTypeSelect>
        </Box>

        <Box display={"flex"} minWidth={210} maxWidth={250}>
          <EditionSelect
            value={getEdition()}
            onSelect={setEdition}
          >
            <MenuItem value={"any"}>Any</MenuItem>
            <MenuItem value={"none"}>None</MenuItem>
          </EditionSelect>
        </Box>
      </Box>
    </Box>

  </Box>;
};

export default CardFilter;
