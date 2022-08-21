import "./Card.css";

const Card = ({name, image, type, body}) => {
  return (
    <div className="card">
      <div className="card-name">{name}</div>
      <div className="card-image"><img src={image} alt={name}/></div>
      <div className="card-type">{type}</div>
      <div className="card-body">{body}</div>
    </div>
  );
};

export default Card;
