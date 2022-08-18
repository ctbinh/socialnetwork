import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

export default function Modal(props) {
  const submitEnter = (e) => {
    if(e.keyCode === 13) {
      props.submit()
    }
  }
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={props.open}
        onClose={() => props.setOpen(false)}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.contentText}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={props.type + "-change"}
            label={props.type === "email" ? "Email Address" : "Password"}
            type={props.type}
            fullWidth
            variant="standard"
            value={props.email}
            onKeyUp={(e)=>submitEnter(e)}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)}>Cancel</Button>
          <Button onClick={() => props.submit()}>{props.loading ? <CircularProgress size={20} /> : props.submitBtnText}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
