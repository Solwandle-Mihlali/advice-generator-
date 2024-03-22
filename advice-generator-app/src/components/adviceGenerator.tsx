import { useEffect, useState } from "react";
import "./advice.css";
import { images } from "../assets/images/images";


interface AdviceResponse {
  slip: {
    advice: string;
    id: number
  };
}

const AdviceGenerator: React.FC = () => {
  const [adviceCounter, setAdviceCounter] = useState(0);
  const [responseHolder, setResponseHolder] = useState<AdviceResponse>()
  const [adviceTxt, setAdviceTxt] = useState<AdviceResponse>();


    const fetchAdvice = async () => {
      try {
        const res = await fetch("https://api.adviceslip.com/advice").then(async (response) => {
          if (response.status == 200) {
           const data = await response.json()
           setResponseHolder(data)
          }
  
          return response;
        });
      } catch (err) {
        console.log("data failed" + err);
      }
    
    };



  


  console.log("data" + " "+ responseHolder)

  return (
    <div className="adviceCont">
      <span className="adviceNumber">ADVICE # {responseHolder?.slip?.id}</span>
      <p className="adviceActual">"{responseHolder?.slip.advice}"</p>
      <div className="dividerSection">
     
       <img src={images.divider} alt="" />
     
      </div>
     
      <span className="dice" onClick={()=>{
         fetchAdvice()
      }}>
         <img src={images.dice} alt="" />
      </span>
    </div>
  );
};

export default AdviceGenerator;
