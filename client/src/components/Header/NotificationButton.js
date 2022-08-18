import { Badge, IconButton, Popover, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "../../api/services/Notification";
import { notificationActions } from "../../store/notification";
import Notifications from "./Notifications";

const NotificationButton = () => {
  const unreadNum = useSelector((state) => state.notification.unreadNum);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const fetchNoti = async () => {
      const data = await NotificationService.getNumUnreadNotifications();
      dispatch(
        notificationActions.setUnreadNum(data.data.unreadNotificationCount)
      );
    };
    fetchNoti();
  }, [dispatch]);
  return (
    <>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        onClick={handleClick}
      >
        <Badge badgeContent={unreadNum} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Notifications />
      </Popover>
    </>
  );
};

export default NotificationButton;
