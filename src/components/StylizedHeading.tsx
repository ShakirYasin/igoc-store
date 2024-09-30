import React from 'react';
interface StylizedHeadingProps {
  text1: string;
  text2?: string;
  text3?: string;
  text4?: string;
  className?: string;
}

const StylizedHeading: React.FC<StylizedHeadingProps> = ({ text1, text2, text3, text4, className = "text-4xl font-bold text-center my-8" }) => {
  return (
    <h1 className={className}>
      <span className="text-black">{text1}</span>
      {text2 && <span className="text-lime-400"> {text2}</span>}
      {(text3 || text4) && <br />}
      {text3 && <span className="text-lime-400">{text3} </span>}
      {text4 && <span className="text-black">{text4}</span>}
    </h1>
  );
};

export default StylizedHeading;