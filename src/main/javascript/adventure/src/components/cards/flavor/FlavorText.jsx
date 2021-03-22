import './FlavorText.css';

const FlavorText = (props) => {
  return (
    <div className="flavor-text">{props.children}</div>
  );
};

export default FlavorText;