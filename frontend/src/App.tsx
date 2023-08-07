import './App.css'
import {ChangeEvent, useState} from "react";
import axios from "axios";
import './index.css'
import PlanCardProps from "./PlanCard.tsx";

function App() {
    const[planInput, setPlanInput] = useState("");
    const[isHidden, setIsHidden] = useState(true);
    const[text, setText] = useState("There are no existing plans!");
    const[planID, setPlanID] = useState(0);
    const[planCard, setPlanCard] = useState([PlanCardProps]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setPlanInput(event.target.value);
    }
    function handleSubmit(event: ChangeEvent<HTMLFormElement>)  {
        event.preventDefault();
        if(planInput !== ""){
            axios.post('/api/plan', {
                name: planInput
            })
                .catch(function (error) {
                    console.log(error);
                });
            setIsHidden(true);
            alert("plan successfully added");
            setText("");
            setPlanID(planID + 1)
        }else {
            alert("please enter a name for the plan")
        }
        setPlanInput("");
    }

    function toggleHidden() {
        setIsHidden(!isHidden);
    }

  return (
    <>
      <h1>Welcome</h1>
      <h2>working plans</h2>
      <p className="">
          {text}
      </p>
        <PlanCard id={planID} name={planInput}></PlanCard>
        <button id="btn-newPlan" onClick={toggleHidden} style={!isHidden ? {display:"none"} : {display:"block"}}>new plan </button>
        <div id="form-box" style={isHidden ? {display:"none"} : {display:"block"}}>
            <form onSubmit={handleSubmit}>
                <label>name of plan </label>
                <input type="text" placeholder={"e.g. week-1"} value={planInput} onChange={handleChange}/>
                <button id="button-add">add</button>
            </form>
            <button id="button-back" onClick={toggleHidden}>back</button>
        </div>
    </>
  )
}

export default App