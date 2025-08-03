type Property = {
  name: string,
  value: any,
  type: string,
  properties: Property[]
};

export const isAttribute = (property: Property) => property.properties.filter(
  subProperty => subProperty.name === 'type' && subProperty.value === 'attribute');

export const isNamed = (name: string) => (property: Property) => property.name === `${name}`;

export const isAttributeWithName = (name: string) => (property: Property) => isNamed(name)(property) && isAttribute(property);

export const findSubPropertyWithName = (name: string) => (property: Property) => property.properties.find(isNamed(name))

export const copyCharacterProperties = ({properties}: { properties: Property[] }): Property[] => {
  return copyProperties(properties)
};

export const copyProperty = (property: Property): Property => {
  return {
    name: property.name,
    type: property.type,
    value: property.value,
    properties: copyProperties(property.properties)
  };
};

export const copyProperties = (properties: Property[]): Property[] => properties.map(copyProperty);

export const updateValue = (property: Property, value: any) => {
  const newProperty = copyProperty(property);
  newProperty.value = value;
  return newProperty;
};
