import {Box, Card, TextField} from "@mui/material";
import React, {useState} from "react";
import EditButtonRow from "../buttons/EditButtonRow/EditButtonRow";
import {VisualCard} from "../cards/VisualCard/VisualCard";
import {Spacer} from "../Layout/Spacer";
import {Row} from "../Row/Row";

type CharacterCardProps = {
  characterName: string
  portraitUrl: string,
  onSave?: (cardId: string) => void,
}

export const CharacterPortraitCard = ({
  characterName,
  portraitUrl = "https://i1.wp.com/nerdarchy.com/wp-content/uploads/2020/04/dd-fighters.jpg",
  onSave
}: CharacterCardProps) => {

  const [isEditing, setIsEditing] = useState(false);

  const [_portraitUrl, _setPortraitUrl] = useState(portraitUrl);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onCancel = () => {
    setIsEditing(false);
    _setPortraitUrl(portraitUrl);
  };

  const _onSave = () => {
    setIsEditing(false);
    onSave && onSave(_portraitUrl);
  };

  return <Card>
    <VisualCard
      name={characterName}
      image={_portraitUrl}
    />
    {onSave && <Row width={284}>
      {!isEditing ?
        <Spacer/> :
        <Box p={1}>
          <TextField
            label="Character Card Id"
            variant="outlined"
            margin="dense"
            defaultValue={_portraitUrl}
            onChange={event => _setPortraitUrl(event.target.value)}
          />
        </Box>
      }
      <EditButtonRow onEdit={onEdit} onCancelEdit={onCancel} onSave={_onSave}/>
    </Row>}
  </Card>;
};
