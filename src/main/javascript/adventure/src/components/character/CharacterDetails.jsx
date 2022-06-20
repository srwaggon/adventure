import useProficiencies from "../proficiency/UseProficiencies";
import {Box, Button, Divider, IconButton, TextField, Typography} from "@mui/material";
import CharacterPortraitCard from "./CharacterPortraitCard/CharacterPortraitCard";
import EditCharacterNameTextField from "./CharacterPage/EditCharacterNameTextField";
import CharacterAttribute from "./CharacterAttribute";
import CharacterResource from "./CharacterResource";
import ProficiencyChip from "./ProficiencyChip";
import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import {D10Icon} from "../icons/DiceIcons";

const CharacterDetails = ({character, setCharacter, isEditing}) => {

  const proficiencies = useProficiencies();

  const characterPageState = {character, setCharacter, isEditing};

  return <Box>
    <Box display="flex" flexDirection="row-reverse" flexWrap="wrap" justifyContent="space-between">
      <Box display="flex" flexGrow={1} justifyContent="center">
        <Box display="block">
          <CharacterPortraitCard {...character}/>
          {isEditing && <Box py={1}>
            <TextField
              label="Portrait URL"
              variant="outlined"
              margin="dense"
              fullWidth
              defaultValue={character["portraitUrl"]}
              onChange={event => setCharacter({...character, portraitUrl: event.target.value})}/>
          </Box>}
        </Box>
      </Box>

      <Box display="flex" flexGrow={1} justifyContent="center">
        <Box maxWidth={844}>
          <Box display="flex" flexGrow={3} p={1}>
            {isEditing
              ? <EditCharacterNameTextField character={character} setCharacter={setCharacter}/>
              : <Typography align="center" variant={"h3"}>{character.name}</Typography>}
          </Box>

          <Divider/>

          <Box>
            <Typography variant="h5">Attributes</Typography>
            <Box display="flex" flexWrap="wrap">
              <Box pr={2}>
                <CharacterAttribute {...characterPageState} attribute={"strength"}/>
                <CharacterAttribute {...characterPageState} attribute={"dexterity"}/>
                <CharacterAttribute {...characterPageState} attribute={"constitution"}/>
              </Box>
              <Box pr={2}>
                <CharacterAttribute {...characterPageState} attribute={"presence"}/>
                <CharacterAttribute {...characterPageState} attribute={"influence"}/>
                <CharacterAttribute {...characterPageState} attribute={"composure"}/>
              </Box>
              <Box pr={2}>
                <CharacterAttribute {...characterPageState} attribute={"intelligence"}/>
                <CharacterAttribute {...characterPageState} attribute={"wits"}/>
                <CharacterAttribute {...characterPageState} attribute={"resolve"}/>
              </Box>
            </Box>
          </Box>

          <Divider/>

          <Box>
            <Typography variant="h5">Resources</Typography>
            <Box display="flex" flexWrap="wrap">
              <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"stamina"}/></Box>
              <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"confidence"}/></Box>
              <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"focus"}/></Box>
              <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"health"}/></Box>
              <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"reputation"}/></Box>
              <Box pr={"16px"}><CharacterResource {...characterPageState} resource={"mana"}/></Box>
            </Box>
          </Box>

          <Divider/>

          <Box>
            <Typography variant="h5">Proficiencies</Typography>
            <Box display="flex" flexWrap="wrap" flexDirection={"row"}>
              {proficiencies.map(proficiency =>
                <ProficiencyChip {...characterPageState} proficiency={proficiency}/>)}
            </Box>
          </Box>

          <Divider/>

          <Box>
            <Typography variant="h5">Skills</Typography>

            <Box display="flex" flexWrap="wrap" flexDirection={"column"}>

              <Box className="character-skill" alignItems={"center"} width={260} display="flex">

                <Button startIcon={<D10Icon/>}>
                  <Box width={80} style={{textTransform: "capitalize", textAlign: "left"}}>
                    {"Animal Handling"}
                  </Box>
                </Button>

                {[...Array(Math.max(5, 3)).keys()].map((int) =>
                  <IconButton
                    key={"Animal Handling"}
                    color={"default"}
                    size={"small"}
                    style={{margin: "-4px"}}
                    checked={int < 5}
                  >{int < 3
                    ? <FiberManualRecordIcon/>
                    : <FiberManualRecordOutlinedIcon/>}
                  </IconButton>,
                )}

              </Box>

              <Box className="character-skill" alignItems={"center"} width={260} display="flex">

                <Button startIcon={<D10Icon/>}>
                  <Box width={80} style={{textTransform: "capitalize", textAlign: "left"}}>
                    {"Sailing"}
                  </Box>
                </Button>

                {[...Array(Math.max(5, 4)).keys()].map((int) =>
                  <IconButton
                    key={"Sailing"}
                    color={"default"}
                    size={"small"}
                    style={{margin: "-4px"}}
                    checked={int < 5}
                  >{int < 4
                    ? <FiberManualRecordIcon/>
                    : <FiberManualRecordOutlinedIcon/>}
                  </IconButton>,
                )}

              </Box>

            </Box>

          </Box>

        </Box>
      </Box>
    </Box>
  </Box>;
};

export default CharacterDetails;
