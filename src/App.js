import './App.css';
import {observer} from "mobx-react-lite";
import MainPage from "./pages/MainPage";
import React from "react";

function App() {
  return (
      <>
        <main>
          <MainPage/>
        </main>
      </>
  );
}

export default observer(App);
