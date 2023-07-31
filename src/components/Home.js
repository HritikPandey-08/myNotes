import React from "react";
import Notes from "./Notes";
import AddNotes from "./AddNotes";
function Home(props) {
  const {showAlert} = props;

  
  return (
    <div>
     <AddNotes showAlert={showAlert}/>
      <Notes showAlert={showAlert}/>


    </div>
  );
}

export default Home;
