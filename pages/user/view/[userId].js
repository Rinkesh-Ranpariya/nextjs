import { Paper } from "@mui/material";
import Image from "next/image";
import React from "react";
import { getUser, getUsers } from "../../../utils/apiCall";
import maleLogoImage from "../../../public/images/male.png";
import femaleLogoImage from "../../../public/images/female.png";

export async function getStaticPaths() {
  const allUsers = await getUsers();

  return {
    paths: allUsers.map((user) => ({ params: { userId: user.id } })),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  console.log(params, "===");

  const user = await getUser(params.userId);

  return {
    props: { user },
  };
}

const ViewUser = ({ user }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <Paper
        elevation={4}
        sx={{ maxWidth: 1000 }}
        className="flex flex-col md:flex-row p-5 gap-10 w-full rounded"
      >
        <div className="flex justify-center">
          <Image
            src={user.gender === "Male" ? maleLogoImage : femaleLogoImage}
            alt="Picture of the author"
            width={235}
            height={235}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
        <div>
          <div className="flex my-5">
            <div className="w-full">
              <h3 className="my-1">Name</h3>
              <div>{user.name}</div>
            </div>
            <div className="w-full">
              <h3 className="my-1">Designation</h3>
              <div>{user.designation}</div>
            </div>
          </div>

          <div className="w-full my-5">
            <h3 className="my-1">Description</h3>
            <div>{user.description}</div>
          </div>

          <div className="flex my-5">
            <div className="w-full">
              <h3 className="my-1">Email</h3>
              <div>{user.email}</div>
            </div>
            <div className="w-full">
              <h3 className="my-1">Phone no.</h3>
              <div>{user.phone}</div>
            </div>
          </div>

          <div className="w-full my-5">
            <h3 className="my-1">Gender</h3>
            <div>{user.gender}</div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ViewUser;
