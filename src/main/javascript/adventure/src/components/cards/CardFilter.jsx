import {Box, MenuItem, TextField} from "@mui/material";
import CardTypeSelect from "./CardTypeSelect";
import React, {useEffect} from "react";
import CardQualitySelect from "./CardQualitySelect";
import CardEditionSelect from "./CardEditionSelect";
import {useSearchParams} from "react-router-dom";

const filterName = (name) => (card) => card.name.toLowerCase().includes(name.toLowerCase());

const filterType = (type) => (card) => "any" === type || type === card.type;

const filterQuality = (quality) => (card) =>
  "any" === quality
  || ("none" === quality && card.quality === null)
  || quality === card.quality;

const filterEdition = (editionId) => (card) =>
  "any" === editionId
  || ("none" === editionId && card.editionId === null)
  || editionId === card.editionId;

const NameFilter = ({onFilterName, defaultValue}) => <TextField
  label="Name"
  variant="outlined"
  margin="dense"
  fullWidth
  defaultValue={defaultValue}
  onChange={(event) => onFilterName(event.target.value)}
/>;

const CardFilter = ({setFilterFunc}) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const getName = () => searchParams.get("name") || "";

  const getType = () => searchParams.get("type") || "any";

  const getQuality = () => searchParams.get("quality") || "any";

  const getEdition = () => searchParams.get("edition") || "any";

  const setParams = (params = {}) => {
    setSearchParams({
      name: (params && params.name) || "",
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
        .filter(filterName(getName()))
        .filter(filterType(getType()))
        .filter(filterQuality(getQuality()))
        .filter(filterEdition(getEdition()))
    );
  }, [searchParams]);

  const onFilterName = name => {
    setParams({name});
  };

  const onFilterType = type => {
    setParams({type});
  };

  const onFilterQuality = (quality) => {
    const qualityId = quality === "none" ? "none"
      : quality === "any" ? "any"
        : quality;
    setParams({quality: qualityId});
  };

  function onFilterEdition(edition) {
    const editionId = edition === "none" ? "none"
      : edition === "any" ? "any"
        : edition.id;
    setParams({edition: editionId});
  }

  return <Box display={"flex"} flexGrow={2} flexShrink={1} justifyContent={"flex-end"} flexWrap={"wrap"}>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <NameFilter
        onFilterName={onFilterName}
        defaultValue={getName()}
      />
    </Box>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <CardQualitySelect
        defaultValue={getQuality()}
        onSelect={onFilterQuality}>
        <MenuItem value={"any"}>Any</MenuItem>
        <MenuItem value={"none"}>None</MenuItem>
      </CardQualitySelect>
    </Box>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <CardTypeSelect
        defaultValue={getType()}
        onSelect={onFilterType}>
        <MenuItem value={"any"}>Any</MenuItem>
      </CardTypeSelect>
    </Box>

    <Box flexGrow={1} flexShrink={1} pl={1}>
      <CardEditionSelect
        defaultValue={getEdition()}
        onSelect={onFilterEdition}
      >
        <MenuItem value={"any"}>Any</MenuItem>
        <MenuItem value={"none"}>None</MenuItem>
      </CardEditionSelect>
    </Box>

  </Box>;
};

export default CardFilter;
