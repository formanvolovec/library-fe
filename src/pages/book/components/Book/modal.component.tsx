import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { BookDispatch } from "../../../../enum/enums";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {id} = useParams() as any;

  const handleDelete = () => {
    dispatch({
      type: BookDispatch.DELETE,
      payload: id
    });
    history.replace('/book-list')
  }
  return (
    <div>
      <Button onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`Delete book?`}
          </Typography>
          <Grid container direction="row" justifyContent='center'>
            <Grid item><Button onClick={handleDelete}>Yes</Button></Grid>
            <Grid item><Button onClick={handleClose}>No</Button></Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}