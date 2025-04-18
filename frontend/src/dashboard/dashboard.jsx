import React, { useState, useEffect } from "react"
import { enqueueSnackbar } from "notistack"

import SideBar from "../global.components/sideBar"
import Board from "./components/board"
import LogOutBtn from "../global.components/components/logOutBtn"
import ProfileImg from "../global.components/components/profile.Img"
import CreatBlock from "../global.components/components/creatBlock"

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [blocks, setBlocks] = useState([]);
  const [nextId, setNextId] = useState(1);

  const maxBlocks = 4;

  const handleAddBlock = () => {
    console.log("Tentativo di aggiungere blocco ID:", nextId);

    if (blocks.length >= 4) {
      console.log("Max Blocks Limit Reached =", maxBlocks);
      enqueueSnackbar("Max Blocks Limit Reached", { variant: "error" });
      return;
    }
    const newBlock = {
      id: nextId,
    };
    setBlocks((currentBlocks) => [...currentBlocks, newBlock]);
    setNextId((prevId) => prevId + 1);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Token not found");
          throw new Error("Authentication Request");
        }
        const urlApi = "http://localhost:4000/api/v1/dashboard";

        const response = await fetch(
          urlApi,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
          console.log("start fetch")
        );

        if (!response.ok) {
          throw (
            (new Error("Server Error:", response.status),
            console.log("fetch error:", response.status))
          );
        }

        const data = await response.json();
        console.log("JSON full received:", data);
        console.log("User data hello:", data.userInfo);
        setUserInfo(data.userInfo);
        enqueueSnackbar("Dashboard Succesfully Logged", { variant: "success" });
        setIsLoading(false);
      } catch (error) {
        console.log("Somethings wrong:", error);
        enqueueSnackbar(error.message, { variant: "error" });
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <main className="px-2 py-4 d-flex vh-100 bg-dark align-items-center">
      <SideBar>
        <ProfileImg />
        <CreatBlock handleAddBlock={handleAddBlock} />
        <LogOutBtn />
      </SideBar>
      <Board userInfo={userInfo} blocks={blocks} />
    </main>
  );
};

export default Dashboard;
