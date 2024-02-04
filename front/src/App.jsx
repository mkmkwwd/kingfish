import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ImageResultPage from "./pages/ImageResultPage";
import FishMapPage from "./pages/FishMapPage";
import FishMapDetailPage from "./pages/FishMapDetailPage";
import ImageEditPage from "./pages/ImageEditPage";
import FishBookPage from "./components/fishbook/FishBookPage";
import FishBookDetailPage from "./components/fishbook/FishBookDetailPage";
import LoginPage from "./pages/LoginPage";
import RoomList from "./pages/room/RoomList";
import CreateRoom from "./pages/room/CreateRoom";
import VideoRoomComponent from "./pages/room/openVidu/VideoRoomComponent copy";
import MediaPage from "./pages/MediaPage";
import BoardPage from "./pages/BoardPage";
import BoardDetail from "./components/board/BoardDetail";
import BoardCreate from "./components/board/BoardCreate";
import AuthPage from "./pages/AuthPage";
import MyPage from "./pages/MyPage";
import TutorialPage from "./pages/TutorialPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="fish">
          <Route path="image/result" element={<ImageResultPage />} />
          <Route path="map" element={<FishMapPage />} />
        </Route>
        <Route path="media">
          <Route index element={<MediaPage />} />
          <Route path="roomList">
            <Route index element={<RoomList />} />
            <Route path="create">
              <Route index element={<CreateRoom />} />
            </Route>
          </Route>
          <Route path="board">
            <Route index element={<BoardPage />} />

            <Route path=":id" element={<BoardDetail />} />
          </Route>
        </Route>

        <Route path="user/mypage" element={<MyPage />} />
      </Route>

      <Route path="media">
        <Route index element={<MediaPage />} />
        <Route path="board">
          <Route index element={<BoardPage />} />
          <Route path="create" element={<BoardCreate />} />
          <Route path=":id" element={<BoardDetail />} />
        </Route>
      </Route>

      <Route path="/tutorial">
        <Route index element={<TutorialPage />} />
      </Route>

      <Route path="/fish">
        <Route path="map">
          <Route path=":idx" element={<FishMapDetailPage />} />
        </Route>
        <Route path="image/edit" element={<ImageEditPage />} />
      </Route>
      <Route path="/fishbook">
        <Route index element={<FishBookPage />} />
        <Route path=":id" element={<FishBookDetailPage />} />
      </Route>

      <Route path="/login">
        <Route index element={<LoginPage />} />
        <Route path=":social" element={<AuthPage />} />
      </Route>

      <Route path="/live/:id" element={<VideoRoomComponent />}></Route>
    </Routes>
  );
}

export default App;
