import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css"; // import file css
import AlbumList from "./pages/Albums/AlbumList";
import AlbumDetail from "./pages/Albums/AlbumDetail";
import UserList from "./pages/Users/UserList";
import UserDetail from "./pages/Users/UserDetail";
import Sidebar from "./components/Sidebar/Sidebar";
import AppHeader from "./components/Header/Header"

function App() {
  return (
    <Router>
      <div className="appContainer">
        <div className="appHeader">
          <AppHeader />
        </div>
        
        <div className="appContent">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Navigate to="/albums" replace />} />
            <Route path="/albums" element={<AlbumList />} />
            <Route path="/albums/:albumId" element={<AlbumDetail />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserDetail />} />
            <Route
              path="*"
              element={
                <div
                  style={{ textAlign: "center", marginTop: 80, color: "red" }}
                >
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
