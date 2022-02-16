import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function useDeleteDialog(title, onDelete) {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDialog = () => setDeleteDialogOpen(true);
  const handleClose = () => setDeleteDialogOpen(false);

  const DeleteDialog = () => <Dialog
    open={isDeleteDialogOpen}
    onClose={handleClose}
  >
    <DialogTitle>
      {title}
    </DialogTitle>
    <DialogActions>
      <Button autoFocus onClick={handleClose}>Cancel</Button>
      <Button startIcon={<DeleteIcon/>} color='secondary' onClick={onDelete}>Delete</Button>
    </DialogActions>
  </Dialog>;
  return {openDialog, DeleteDialog};
}
