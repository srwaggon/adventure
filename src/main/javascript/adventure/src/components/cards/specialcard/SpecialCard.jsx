import './SpecialCard.css'

const SpecialCard = ({name, image, imageSize, type, body}) => {
  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: imageSize,
  };
  return (
    <div style={cardStyle} className="specialcard">
      <div className="specialcard-name">{name}</div>
      <div className="specialcard-image" />
      <div className="specialcard-type">{type}</div>
      <div className="specialcard-body">{body}</div>
    </div>
  );
};

export default SpecialCard;