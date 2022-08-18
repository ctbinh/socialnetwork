import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui';

const AlertBox = () => {
  const dispatch = useDispatch()
  const alertBox = useSelector((state) => state.ui.alertBox);
  const handleClose = () => {
    dispatch(uiActions.closeAlert());
  };
  return (
    <Snackbar
        open={alertBox.isDisplay}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertBox.status}
          sx={{ width: "100%" }}
        >
          {alertBox.message}
        </Alert>
      </Snackbar>
  )
}

export default AlertBox