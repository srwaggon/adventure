type Property = {
  name: string,
  value: any,
  type: string,
  properties: Property[]
};

export const isNamed = (name: string) => (property: Property) => property.name === `${name}`;
export const isTyped = (type: string) => (property: Property) => property.type === `${type}`;
export const hasValue = (value: any) => (property: Property) => property.value === value;

export const hasTypeProperty = (type: String) => (property: Property) => property.properties.filter(
  subProperty => isNamed('type')(subProperty) && hasValue(type)(subProperty));

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


export const isAttribute = (property: Property) => hasTypeProperty('attribute')(property);

export const isAttributeWithName = (name: string) => (property: Property) => isNamed(name)(property) && isAttribute(property);

export const isResource = (property: Property) => hasTypeProperty('resource')(property);

export const isResourceWithName = (name: string) => (property: Property) => isNamed(name)(property) && isResource(property);
