import { useEffect, useState } from "react";
import "./advice.css";
import { images } from "../assets/images/images";

interface AdviceResponse {
  slip: {
    advice: string;
    id: number;
  };
}

const AdviceGenerator: React.FC = () => {
  const [responseHolder, setResponseHolder] = useState<AdviceResponse>();

  const fetchAdvice = async () => {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (response.status === 200) {
        const data = await response.json();
        setResponseHolder(data);
      } else {
        console.error("Failed to fetch data: ", response.status);
      }
    } catch (error) {
      console.error("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    if (!responseHolder) {
      fetchAdvice();
    }
  }, [responseHolder]);

  console.log("data" + " " + responseHolder);

  return (
    <div className="adviceCont">
      <span className="adviceNumber">ADVICE # {responseHolder?.slip?.id}</span>
      <p className="adviceActual">"{responseHolder?.slip.advice}"</p>
      <div className="dividerSection">
        <img src={images.divider} alt="" />
      </div>

      <span className="dice" onClick={()=>fetchAdvice()}>
        <img src={images.dice} alt="" />
      </span>
    </div>
  );
};

export default AdviceGenerator;
