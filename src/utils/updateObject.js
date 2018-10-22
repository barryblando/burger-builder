// Immutable Update Patterns
export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject, // copy old object using spread
  ...updatedProperties // override the ones in old object or add new ones that are pass down by updatedProperties object
});