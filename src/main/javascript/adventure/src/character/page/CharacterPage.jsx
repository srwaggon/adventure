import './CharacterPage.css'

const CharacterPage = () => {
  return (
    <div className="character-page">
      <h1>Cool-Guy Jones</h1>

      <div className="character-attributes">
        <div className="character-attribute-group">
          <CharacterAttribute name="Strength" value={4} />
          <CharacterAttribute name="Dexterity" value={4} />
          <CharacterAttribute name="Constitution" value={2} />
        </div>
        <div className="character-attribute-group">
          <CharacterAttribute name="Intelligence" value={2} />
          <CharacterAttribute name="Wit" value={2} />
          <CharacterAttribute name="Concentration" value={4} />
        </div>
        <div className="character-attribute-group">
          <CharacterAttribute name="Charisma" value={1} />
          <CharacterAttribute name="Influence" value={2} />
          <CharacterAttribute name="Reputation" value={3} />
        </div>
      </div>
      <div className="character-resources">
        <div className="character-resource-group"><CharacterResource name="Stamina" max={8} value={5} /></div>
        <div className="character-resource-group"><CharacterResource name="Focus" max={10} value={5} /></div>
        <div className="character-resource-group"><CharacterResource name="Confidence" max={3} value={3} /></div>
      </div>
      <CharacterResource name="Health" max={10} value={10} />
    </div>
  );
};

const CharacterResource = ({name, max, value}) => {

  return (
    <div className="character-resource">
      <div>{name}</div>
      <div className="character-resource-value">
        {[...Array(10).keys()].map(
          (int) =>
            <input
              type={"checkbox"}
              key={int}
              checked={int < value}
              disabled={int >= max}
              />)}
      </div>
    </div>
  );
};

const CharacterAttribute = ({name, max=5, value=1}) => {
  return (
  <div className="character-attribute">
    <div className="character-attribute-name">{name}</div>
    <div className="character-attribute-value">
      {[...Array(max).keys()].map((int) => <input type="checkbox" key={int} checked={int < value}/>)}
    </div>
  </div>
  );
};

export default CharacterPage;