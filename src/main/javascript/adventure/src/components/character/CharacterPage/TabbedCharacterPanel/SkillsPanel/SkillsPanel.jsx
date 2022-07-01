import React from "react";

import {useParams} from "react-router-dom";
import {useCharacter} from "../../../UseCharacter";
import SkillsSection from "./SkillsSection/SkillsSection";

export const SKILLS_TAB = "skills";
export const SkillsPanel = ({selectedTab}) => {
  const {characterId} = useParams();
  const {character, setCharacter} = useCharacter(characterId);
  return selectedTab === SKILLS_TAB && <>
    <SkillsSection {...{character, setCharacter}}/>
  </>;
};
