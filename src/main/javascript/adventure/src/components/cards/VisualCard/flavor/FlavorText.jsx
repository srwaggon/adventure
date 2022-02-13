import "./FlavorText.css";

const FlavorText = ({children}) => {
  return (
    <div className="flavor-text" title={children}>{children}</div>
  );
};

export default FlavorText;