import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { deleteUsers, getUsers } from "../store/userSlice";
import { openToast } from "../store/toastSlice";
import DialogBox from "./DialogBox";

const UserCard = ({ userData }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [idForDeleteUser, setIdForDeleteUser] = useState(null);

  const handleOpenDialog = (userId) => {
    setIdForDeleteUser(userId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="m-3 w-full">
        <div className="h-full flex flex-col justify-between">
          <div>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {userData?.name[0]?.toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={userData?.name}
              subheader={userData?.designation}
            />
            {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {userData?.description}
              </Typography>
            </CardContent>
          </div>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              // onClick={() => push("/viewUser")}
              onClick={() =>
                push({
                  pathname: `/user/view/${userData?.id}`,
                })
              }
            >
              <RemoveRedEyeIcon />
            </IconButton>
            <IconButton
              aria-label="share"
              onClick={() =>
                push({
                  pathname: "/user/update",
                  query: { userId: userData?.id },
                })
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="share"
              onClick={() => handleOpenDialog(userData?.id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </div>
      </Card>
      <DialogBox
        open={open}
        handleClose={handleCloseDialog}
        id={idForDeleteUser}
      />
    </>
  );
};

export default UserCard;
