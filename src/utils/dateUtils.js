// utils/dateUtils.js

/**
 * Converts API date format (DD-MM-YYYY) to HTML input format (YYYY-MM-DD)
 * @param {string} apiDate - Date in DD-MM-YYYY format
 * @returns {string} Date in YYYY-MM-DD format or empty string if invalid
 */
export const convertApiDateToInputFormat = (apiDate) => {
  if (!apiDate || typeof apiDate !== 'string') return '';
  
  // Handle DD-MM-YYYY format from API
  const parts = apiDate.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    // Validate parts are numbers
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      // Return YYYY-MM-DD format for HTML input
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  
  return '';
};

/**
 * Converts HTML input format (YYYY-MM-DD) to API format (DD-MM-YYYY)
 * @param {string} inputDate - Date in YYYY-MM-DD format
 * @returns {string} Date in DD-MM-YYYY format
 */
export const convertInputDateToApiFormat = (inputDate) => {
  if (!inputDate || typeof inputDate !== 'string') return '';
  
  // Handle YYYY-MM-DD format from HTML input
  const parts = inputDate.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    // Return DD-MM-YYYY format for API
    return `${day}-${month}-${year}`;
  }
  
  return inputDate;
};

/**
 * Formats date for display (MM/DD/YYYY)
 * @param {string} dateString - Date string in various formats
 * @returns {string} Formatted date string
 */
export const formatDateForDisplay = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return "Not provided";
  
  let date;
  
  // Try DD-MM-YYYY format first (API format)
  const ddmmyyyy = dateString.split('-');
  if (ddmmyyyy.length === 3 && !isNaN(ddmmyyyy[0]) && !isNaN(ddmmyyyy[1]) && !isNaN(ddmmyyyy[2])) {
    const [day, month, year] = ddmmyyyy;
    date = new Date(year, month - 1, day);
  } else {
    // Try standard Date constructor
    date = new Date(dateString);
  }
  
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Validates date of birth with comprehensive checks
 * @param {string} dateValue - Date value to validate
 * @returns {string|null} Error message or null if valid
 */
export const validateDateOfBirth = (dateValue) => {
  // Check if date is empty, null, undefined, or just whitespace
  if (!dateValue || dateValue.toString().trim() === '') {
    return "Date of birth is required";
  }

  try {
    let birthDate;
    
    // Handle different date formats
    if (typeof dateValue === 'string' && dateValue.includes('-')) {
      const parts = dateValue.split('-');
      if (parts.length === 3) {
        // Check if it's DD-MM-YYYY (API format) or YYYY-MM-DD (input format)
        if (parts[0].length === 4) {
          // YYYY-MM-DD format
          birthDate = new Date(dateValue);
        } else {
          // DD-MM-YYYY format
          const [day, month, year] = parts;
          birthDate = new Date(year, month - 1, day);
        }
      } else {
        birthDate = new Date(dateValue);
      }
    } else {
      birthDate = new Date(dateValue);
    }
    
    // Check if the date is invalid
    if (isNaN(birthDate.getTime())) {
      return "Please enter a valid date";
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set to end of today for accurate comparison
    
    // Check if date is in the future
    if (birthDate > today) {
      return "Date of birth cannot be in the future";
    }

    // Check age - must be at least 18
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
      ? age - 1 
      : age;

    if (actualAge < 18) {
      return "Must be at least 18 years old";
    }

    // Check if date is too old (more than 120 years)
    if (actualAge > 120) {
      return "Please enter a valid date of birth";
    }

    return null; // Valid date
  } catch (error) {
    return "Please enter a valid date";
  }
};

/**
 * Checks if a date value is empty or represents an invalid date
 * @param {string} dateValue - Date value to check
 * @returns {boolean} True if empty or invalid
 */
export const isDateEmpty = (dateValue) => {
  if (!dateValue || dateValue.trim() === '') return true;
  
  const formatted = formatDateForDisplay(dateValue);
  return formatted === "Not provided" || formatted === "Invalid date";
};

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
    const foundCouncil = allCouncils.find(c => c.id == council);
    return foundCouncil ? foundCouncil.title : String(council);
  }
  
  return String(council);
};

/**
 * Gets the value for council dropdown (returns object for dropdown, ID for API)
 * @param {object|string|number} council - Council object, ID, or string
 * @param {Array} allCouncils - Array of all available councils
 * @param {boolean} forApi - If true, returns ID; if false, returns object
 * @returns {object|string|number} Council object for dropdown or ID for API
 */
export const getCouncilValue = (council, allCouncils = [], forApi = false) => {
  if (!council) return forApi ? "" : "";
  
  // If it's already an object with ID
  if (typeof council === 'object' && council.id) {
    return forApi ? council.id : council;
  }
  
  // If it's an ID, find the full object or return ID
  if (typeof council === 'number' || typeof council === 'string') {
    if (forApi) {
      return council;
    }
    
    const foundCouncil = allCouncils.find(c => c.id == council);
    return foundCouncil || { id: council, title: String(council) };
  }
  
  return forApi ? "" : council;
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