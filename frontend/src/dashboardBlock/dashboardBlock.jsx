import React from "react";
import { useParams } from "react-router-dom";

import SideBar from "../global.components/sideBar";
import ProfileImg from "../global.components/components/profile.Img";
import LogOutBtn from "../global.components/components/logOutBtn";
import TakeNoteArea from "./components/takeNoteArea";
import NoteTitle from "./components/NoteTitle";

const DashboardBlock = () => {
  return (
    <main className="px-2 py-4 d-flex vh-100 bg-dark align-items-center">
      <SideBar>
        <ProfileImg />
        <LogOutBtn />
      </SideBar>
      <div className="px-2 py-4 d-flex flex-column vh-100 bg-dark">
        <NoteTitle />
        <TakeNoteArea />
      </div>
    </main>
  );
};

export default DashboardBlock;
