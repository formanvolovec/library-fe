import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { BookSaga } from "../../../../shared/enums";
import { useState } from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams() as any;

  const handleDelete = () => {
    dispatch({type: BookSaga.DELETE, payload: id, push: history.push});
  }
  return (
    <div>
      <Button variant="outlined" onClick={ handleOpen } startIcon={<DeleteIcon/>}>Delete</Button>
      <Modal
        open={ open }
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ style }>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { `Delete this book?` }
          </Typography>
          <Grid container direction="row" justifyContent='center'>
            <Grid item><Button onClick={ handleDelete }>Yes</Button></Grid>
            <Grid item><Button onClick={ handleClose }>No</Button></Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
