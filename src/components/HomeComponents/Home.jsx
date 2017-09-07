import React from "react"
import Sidebar from "../../containers/HomeContainer/Sidebar.jsx";
import SideList from "../../containers/HomeContainer/SideList.jsx";
import ShowBody from "../../containers/HomeContainer/ShowBody";

const Home =(props) => <div className="Home top-box">
    <Sidebar></Sidebar>
    <SideList></SideList>
    <ShowBody></ShowBody>
</div>
export default Home;