// utils/councilUtils.js

/**
 * Gets display value for local council (always returns the title/name)
 * @param {object|string|number} council - Council object, ID, or string
 * @param {Array} allCouncils - Array of all available councils
 * @returns {string} Display name of the council
 */
export const getCouncilDisplayValue = (council, allCouncils = []) => {
  if (!council) return "";
  
  // If council is already an object with title, use it
  if (typeof council === 'object' && council.title) {
    return council.title;
  }
  
  // If it's an ID or string, find the matching council
  if (typeof council === 'number' || typeof council === 'string') {
    const foundCouncil = allCouncils.find(c => c.id == council || c.title === council);
    return foundCouncil ? foundCouncil.title : String(council);
  }
  
  return String(council);
};

/**
 * Gets the council ID for API submission
 * @param {object|string|number} council - Council object, ID, or string
 * @param {Array} allCouncils - Array of all available councils
 * @returns {number|string} Council ID for API
 */
export const getCouncilIdForApi = (council, allCouncils = []) => {
  if (!council) return "";
  
  // If it's already an object with ID, return the ID
  if (typeof council === 'object' && council.id) {
    return council.id;
  }
  
  // If it's a string (council name), find the ID
  if (typeof council === 'string') {
    const foundCouncil = allCouncils.find(c => c.title === council);
    if (foundCouncil) {
      return foundCouncil.id;
    }
    // If not found by title, maybe it's already an ID as string
    const foundById = allCouncils.find(c => c.id == council);
    return foundById ? foundById.id : council;
  }
  
  // If it's a number, assume it's already an ID
  if (typeof council === 'number') {
    return council;
  }
  
  return council;
};

/**
 * Gets the value for council dropdown (returns object for dropdown)
 * @param {object|string|number} council - Council object, ID, or string
 * @param {Array} allCouncils - Array of all available councils
 * @returns {object} Council object for dropdown
 */
export const getCouncilValueForDropdown = (council, allCouncils = []) => {
  if (!council) return null;
  
  // If it's already an object with ID, return it
  if (typeof council === 'object' && council.id) {
    return council;
  }
  
  // If it's a string (council name), find the full object
  if (typeof council === 'string') {
    const foundCouncil = allCouncils.find(c => c.title === council);
    if (foundCouncil) {
      return foundCouncil;
    }
    // If not found by title, maybe it's an ID as string
    const foundById = allCouncils.find(c => c.id == council);
    return foundById || { id: council, title: council };
  }
  
  // If it's a number (ID), find the full object
  if (typeof council === 'number') {
    const foundCouncil = allCouncils.find(c => c.id === council);
    return foundCouncil || { id: council, title: String(council) };
  }
  
  return { id: council, title: String(council) };
};

/**
 * Validates local council selection
 * @param {any} councilValue - Council value to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateLocalCouncil = (councilValue) => {
  if (!councilValue) {
    return "Local council is required";
  }
  
  // Check if it's an object with id
  if (typeof councilValue === 'object' && !councilValue.id) {
    return "Please select a valid local council";
  }
  
  return null;
};