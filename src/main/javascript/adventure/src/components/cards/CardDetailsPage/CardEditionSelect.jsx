import React, {useContext, useEffect} from "react";
import {CardContext} from "./CardContext";
import {EditingContext} from "./EditingContext";
import useEditions from "../../edition/useEditions";
import {Box} from "@mui/material";
import EditionSelect from "../EditionSelect";
import {useNavigate} from "react-router-dom";
import AddButton from "../../buttons/AddButton";

const CardEditionSelect = () => {

    const [card, setCard] = useContext(CardContext);

    const [isEditing] = useContext(EditingContext);

    const editions = useEditions();

    useEffect(() => {
        if (!card.editionId && editions.length > 0) {
            setCard({...card, editionId: editions[0].id});
        }
    }, [card, setCard, editions]);

    return (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <EditionSelect
                value={card.editionId || ""}
                onSelect={edition => setCard(
                    {...card, editionId: edition.id})}
            />

            {isEditing && <AddEditionButton/>}
        </Box>

    );
};

const AddEditionButton = () => {
    const navigate = useNavigate();

    return <AddButton onClick={() =>
        // navigate("/editions/new")
        alert("Creating new editions is not yet implemented.")
    }/>;
};

export default CardEditionSelect;
