import{
    faLocationDot,
    faBowlFood,
    faUser,
    faCalendarDays,

}from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";



const Header=({type})=>
 {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    guest: 1,
   
    chef: 1,
  });
  const navigate =useNavigate()

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch=()=>{
    navigate("/hotels",{state:{destination,date,options}});
  }

  return (
    <div className="header">
      <div  className={type=== "list" ? "headerContainer listMode":"headerContainer" }>
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Location</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBowlFood} />
            <span>Cuisine</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faUser} />
            <span>Register as Partner</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Location</span>
            </div>
        </div>
        {type!== "list" && (
          <>
          
        <h1 className="headerTitle">Book A Chef</h1>
        <p className="headerDesc">
          Served 1 lakh people in 50 cities
        </p>
        <button className="headerBtn">Sign in/Register</button>

      
        <div className="headerSearch">
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faLocationDot} className="headerIcon"/>
          <input type="text"
           placeholder="Your Location" 
          className="headerSearchInput"
          onChange={e=>setDestination(e.target.value)}
          />

          </div>
       
       
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
          <span onClick={()=>setOpenDate(!openDate)}className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
          
          {openDate && < DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />}
          </div>
        
        
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faUser} className="headerIcon"/>
          <span 
           onClick={()=>setOpenOptions(!openOptions)}
           className="headerSearchText">
           {`${options.guest} guest . ${options.chef} chef `}
          </span>
         
            {openOptions && (<div className="options">
                    <div className="optionItem">
                      <span className="optionText">Guest</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.guest <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("guest", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.guest}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("guest", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
            <div className="optionItem">
              <span className="optionText">Chef</span>
              <div className="optionCounter">
              <button 
              disabled={options.chef<=1}
              className="optionCounterButton" 
              onClick={()=>handleOption("chef","d")}>-</button>
              <span className="optionCounterNumber">{options.chef}</span>
              <button 
               className="optionCounterButton"
               onClick={()=>handleOption("chef","i")}>+
              </button>
            </div>
           </div>
          </div>
 )}
          </div>
          <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
          </div>
          </>
          )}
      
          </div>

    </div>
  )
}
export default Header

