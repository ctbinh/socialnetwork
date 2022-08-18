import { Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import NotificationService from "../../api/services/Notification";
import { notificationActions } from "../../store/notification";
import Notification from "./Notification";

const Notifications = () => {
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNoti = async () => {
      const data = await NotificationService.fetchMyNoti();
      console.log(data);
      dispatch(notificationActions.setNotifications(data.data.notifications));
    };
    fetchNoti();
  }, [dispatch]);

  return (
    <Container>
      <div style={{ padding: "5px" }}>
        <h2>Notifications</h2>
        <Divider />
      </div>
      {notifications.map((item) => {
        return <Notification key={item._id} notification={item} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  max-height: 600px;
  padding: 10px;
  overflow-y: scroll;
  width: 360px;
  ::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #757575;
  }
`;
export default Notifications;
