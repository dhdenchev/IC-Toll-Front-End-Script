// // Function to set the dropdown value based on the field ID and the desired value
// function setDropdownValue(fieldId, value) {
//   const dropdown = document.getElementById(fieldId); // Use the fieldId parameter to get the dropdown element
//   if (dropdown) {
//     // Normalize the API value to lowercase and trim any extra spaces
//     const normalizedValue = value.toLowerCase().trim(); // Ensuring the value matches the dropdown option values
//     console.log("Normalized Value from API:", normalizedValue); // Debugging: Log the normalized value

//     // Check if the value exists in the dropdown options
//     const optionExists = Array.from(dropdown.options).some(
//       (option) => option.value === normalizedValue
//     );

//     if (optionExists) {
//       dropdown.value = normalizedValue; // Set the selected value dynamically
//       console.log("Dropdown value set to:", dropdown.value); // Debugging: Confirm the value is set
//     } else {
//       console.error(
//         `Value "${normalizedValue}" does not exist in dropdown options.`
//       );
//     }
//   } else {
//     console.error('Dropdown with ID "' + fieldId + '" not found.');
//   }
// }

// Function to set the dropdown value based on the field ID and the desired value
function setDropdownValue(fieldId, value) {
  const dropdown = document.getElementById(fieldId); // Use the fieldId parameter to get the dropdown element
  if (dropdown) {
    console.log(`Dropdown found with ID: ${fieldId}`); // Debugging: Log when dropdown is found
    if (value !== undefined && value !== null) {
      const normalizedValue = value.trim().toLowerCase(); // Normalize the API value to lowercase and trim any extra spaces
      console.log("Normalized Value from API:", normalizedValue); // Debugging: Log the normalized value

      // Check if the normalized value is an empty string
      if (normalizedValue === "") {
        console.warn(
          `Empty string provided for ${fieldId}. Setting dropdown to default.`
        );
        dropdown.value = "Default"; // Set to default option if value is an empty string
        console.log("Dropdown value set to default:", dropdown.value); // Debugging: Confirm the value is set to default
        return;
      }

      // Convert dropdown options to lowercase for comparison
      const optionExists = Array.from(dropdown.options).some(
        (option) => option.value.toLowerCase() === normalizedValue
      );

      if (optionExists) {
        // Find the matching option's original value
        const matchingOption = Array.from(dropdown.options).find(
          (option) => option.value.toLowerCase() === normalizedValue
        );
        dropdown.value = matchingOption.value; // Set the selected value dynamically using the original value
        console.log("Dropdown value set to:", dropdown.value); // Debugging: Confirm the value is set
      } else {
        console.warn(
          `Value "${normalizedValue}" does not exist in dropdown options. Setting to default.`
        );
        dropdown.value = "Default"; // Set to default option if value does not exist
        console.log("Dropdown value set to default:", dropdown.value); // Debugging: Confirm the value is set to default
      }
    } else {
      console.warn(
        "Invalid value provided. The value is either undefined or null. Setting to default."
      );
      dropdown.value = "Default"; // Set to default option if value is undefined or null
      console.log("Dropdown value set to default:", dropdown.value); // Debugging: Confirm the value is set to default
    }
  } else {
    console.error('Dropdown with ID "' + fieldId + '" not found.');
  }
}
// function setDropdownValue(fieldId, value) {
//   const dropdown = document.getElementById(fieldId); // Use the fieldId parameter to get the dropdown element
//   if (dropdown) {
//     console.log(`Dropdown found with ID: ${fieldId}`); // Debugging: Log when dropdown is found
//     if (value !== undefined && value !== null) {
//       // Check if value is defined and not null
//       const normalizedValue = value.trim().toLowerCase(); // Normalize the API value to lowercase and trim any extra spaces
//       console.log("Normalized Value from API:", normalizedValue); // Debugging: Log the normalized value

//       // Convert dropdown options to lowercase for comparison
//       const optionExists = Array.from(dropdown.options).some(
//         (option) => option.value.toLowerCase() === normalizedValue
//       );

//       if (optionExists) {
//         // Find the matching option's original value
//         const matchingOption = Array.from(dropdown.options).find(
//           (option) => option.value.toLowerCase() === normalizedValue
//         );
//         dropdown.value = matchingOption.value; // Set the selected value dynamically using the original value
//         console.log("Dropdown value set to:", dropdown.value); // Debugging: Confirm the value is set
//       } else {
//         console.error(
//           `Value "${normalizedValue}" does not exist in dropdown options.`
//         );
//       }
//     } else {
//       console.error(
//         "Invalid value provided. The value is either undefined or null."
//       );
//     }
//   } else {
//     console.error('Dropdown with ID "' + fieldId + '" not found.');
//   }
// }

//Functionality to fill up stars colours, depending on average rating.
// function fillStars(wrapperId, rating) {
//   const starsWrapper = document.getElementById(wrapperId);

//   // Ensure the stars wrapper exists
//   if (!starsWrapper) {
//     console.error(`Element with ID '${wrapperId}' not found.`);
//     return;
//   }

//   const stars = starsWrapper.querySelectorAll(".star-module-header");

//   stars.forEach((star, index) => {
//     if (index < Math.floor(rating)) {
//       star.style.color = "#00874f"; // Fully filled star
//       star.style.background = "none"; // Clear any partial backgrounds
//     } else if (index === Math.floor(rating)) {
//       const decimalPart = rating - Math.floor(rating);
//       star.style.background = `linear-gradient(to right, #00874f ${
//         decimalPart * 100
//       }%, white ${decimalPart * 100}%)`;
//       star.style.webkitBackgroundClip = "text"; // Ensure proper text clipping in webkit browsers
//       star.style.webkitTextFillColor = "transparent"; // Prevent text color from showing behind the gradient
//     } else {
//       star.style.color = "white"; // Empty star
//       star.style.background = "none"; // Clear any partial backgrounds
//     }
//   });
// }
// function fillStars(wrapperId, rating) {
//   const starsWrapper = document.getElementById(wrapperId);

//   // Ensure the stars wrapper exists
//   if (!starsWrapper) {
//     console.error(`Element with ID '${wrapperId}' not found.`);
//     return;
//   }

//   // Log the element and its classes
//   console.log("starsWrapper element:", starsWrapper);
//   console.log("Classes on starsWrapper:", starsWrapper.className);

//   // Determine the color based on the parent class
//   let fillColor;
//   if (starsWrapper.classList.contains("risksStarsRating")) {
//     fillColor = "red";
//     console.log("STARS SHOULD BE COLOR RED!");
//   } else {
//     fillColor = "#00874f";
//     console.log("STARS SHOULD BE COLOR GREEN!");
//   }

//   const stars = starsWrapper.querySelectorAll(".star-module-header");

//   stars.forEach((star, index) => {
//     if (index < Math.floor(rating)) {
//       star.style.color = fillColor; // Fully filled star with the determined color
//       star.style.background = "none"; // Clear any partial backgrounds
//     } else if (index === Math.floor(rating)) {
//       const decimalPart = rating - Math.floor(rating);
//       star.style.background = `linear-gradient(to right, ${fillColor} ${
//         decimalPart * 100
//       }%, white ${decimalPart * 100}%)`;
//       star.style.webkitBackgroundClip = "text"; // Ensure proper text clipping in webkit browsers
//       star.style.webkitTextFillColor = "transparent"; // Prevent text color from showing behind the gradient
//     } else {
//       star.style.color = "white"; // Empty star
//       star.style.background = "none"; // Clear any partial backgrounds
//     }
//   });
// }
function fillStars(wrapperId, rating) {
  const starsWrapper = document.getElementById(wrapperId);

  // Ensure the stars wrapper exists
  if (!starsWrapper) {
    console.error(`Element with ID '${wrapperId}' not found.`);
    return;
  }

  // Log the element and its classes for debugging
  console.log("starsWrapper element:", starsWrapper);
  console.log("Classes on starsWrapper:", starsWrapper.className);

  // Determine the color based on the wrapperId and rating
  let fillColor;
  if (wrapperId === "risksStarsRating") {
    if (rating > 2) {
      fillColor = "red";
      console.log("STARS SHOULD BE COLOR RED because rating is more than 2!");
    } else {
      fillColor = "#00874f";
      console.log("STARS SHOULD BE COLOR GREEN because rating is 2 or less!");
    }
  } else {
    fillColor = "#00874f";
    console.log("STARS SHOULD BE COLOR GREEN by default!");
  }

  const stars = starsWrapper.querySelectorAll(".star-module-header");

  stars.forEach((star, index) => {
    if (index < Math.floor(rating)) {
      star.style.color = fillColor; // Fully filled star with the determined color
      star.style.background = "none"; // Clear any partial backgrounds
    } else if (index === Math.floor(rating)) {
      const decimalPart = rating - Math.floor(rating);
      star.style.background = `linear-gradient(to right, ${fillColor} ${
        decimalPart * 100
      }%, white ${decimalPart * 100}%)`;
      star.style.webkitBackgroundClip = "text"; // Ensure proper text clipping in webkit browsers
      star.style.webkitTextFillColor = "transparent"; // Prevent text color from showing behind the gradient
    } else {
      star.style.color = "white"; // Empty star
      star.style.background = "none"; // Clear any partial backgrounds
    }
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

let sOppId = getQueryParam("sOppId");
let offerRecId;

//This function saves the changes to the Creator Record
const saveObservationRating = (sOppId, fieldToUpdate, valueOfFieldToUpdate) => {
  // Ensure valueOfFieldToUpdate is assigned correctly, even if it's an empty string
  valueOfFieldToUpdate =
    valueOfFieldToUpdate === undefined ? "" : valueOfFieldToUpdate;
  const developmentApiUpdate = "http://localhost:3000/api/updateRecordDetails";
  const productionApiUpdate =
    " https://ic-tool-middleware-b0d5a7c7355b.herokuapp.com/api/updateRecordDetails";

  fetch(developmentApiUpdate, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sOppId: sOppId,
      fieldToUpdate: fieldToUpdate,
      valueOfFieldToUpdate: valueOfFieldToUpdate,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

//This function saves the changes to the CRM record
const saveValueToCRM = (
  moduleToUpdate,
  recordId,
  fieldToUpdate,
  valueOfFieldToUpdate
) => {
  // Ensure valueOfFieldToUpdate is assigned correctly, even if it's an empty string
  valueOfFieldToUpdate =
    valueOfFieldToUpdate === undefined ? "" : valueOfFieldToUpdate;
  const developmentApiUpdateCrm =
    "http://localhost:3000/api/updateCrmRecordDetails";
  const productionApiUpdateCrm =
    " https://ic-tool-middleware-b0d5a7c7355b.herokuapp.com/api/updateCrmRecordDetails";

  fetch(developmentApiUpdateCrm, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moduleToUpdate: moduleToUpdate,
      recordId: recordId,
      fieldToUpdate: fieldToUpdate,
      valueOfFieldToUpdate: valueOfFieldToUpdate,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function initializeEditableLinkField(
  fetchedLink,
  inputFieldId,
  linkDisplayId,
  linkFieldId,
  editButtonId
) {
  const inputField = document.getElementById(inputFieldId);
  const linkDisplay = document.getElementById(linkDisplayId);
  const linkField = document.getElementById(linkFieldId);
  const editButton = document.getElementById(editButtonId);
  // Function to ensure the URL has the correct protocol
  function ensureProtocol(url) {
    if (!/^https?:\/\//i.test(url)) {
      return "http://" + url;
    }
    return url;
  }
  // Set initial value from fetched link
  inputField.value = fetchedLink;
  linkField.href = ensureProtocol(fetchedLink);
  linkField.textContent = fetchedLink;
  // Handle input change
  inputField.addEventListener("input", function () {
    const newLink = ensureProtocol(inputField.value.trim());
    linkField.href = newLink;
    linkField.textContent = newLink;
  });
  // Handle click to toggle between view and edit modes
  editButton.addEventListener("click", function () {
    linkDisplay.style.display = "none";
    inputField.style.display = "block";
    inputField.focus();
  });
  // Blur input field to switch back to view mode
  inputField.addEventListener("blur", function () {
    linkDisplay.style.display = "block";
    inputField.style.display = "none";
  });
  // Initially show the link and hide the input field
  linkDisplay.style.display = "block";
  inputField.style.display = "none";
}
//Maps i-frame update GOOGLE EARTH
// Function to extract coordinates from various Google Maps URL formats
function extractCoordinatesGoogleEarth(url) {
  // Attempt to extract coordinates using different URL patterns
  const match = url.match(/@([-?\d.]+),([-?\d.]+),?(\d+)?z/);
  if (match) {
    return {
      lat: match[1],
      lon: match[2],
    };
  }
  // Try extracting from 'place' URL pattern
  const placeMatch = url.match(/place\/([^\/]+)\/@([-?\d.]+),([-?\d.]+)/);
  if (placeMatch) {
    return {
      lat: placeMatch[2],
      lon: placeMatch[3],
    };
  }
  // Fallback in case no coordinates are found
  return null;
}
//Maps i-frame update GOOGLE STREET VIEW
// Function to extract coordinates from various Google Maps URL formats
function extractCoordinatesGoogleStreetView(url) {
  // Attempt to extract coordinates using different URL patterns
  const match = url.match(/@([-?\d.]+),([-?\d.]+),?(\d+)?z/);
  if (match) {
    return {
      lat: match[1],
      lon: match[2],
    };
  }
  // Try extracting from 'place' URL pattern
  const placeMatch = url.match(/place\/([^\/]+)\/@([-?\d.]+),([-?\d.]+)/);
  if (placeMatch) {
    return {
      lat: placeMatch[2],
      lon: placeMatch[3],
    };
  }
  // Try extracting from the street view URL pattern
  const streetViewMatch = url.match(
    /@([-?\d.]+),([-?\d.]+),3a,(\d+y),(\d+\.?\d*h),(\d+\.?\d*t)/
  );
  if (streetViewMatch) {
    return {
      lat: streetViewMatch[1],
      lon: streetViewMatch[2],
    };
  }
  // Fallback in case no coordinates are found
  return null;
}
// Function to update iframe src with new coordinates Google Eath View
function updateIframeSrcGoogleEarth(lat, lon) {
  const iframe = document.getElementById("google_earth_display");
  const newSrc = `https://maps.google.com/?ie=UTF8&t=m&ll=${lat},${lon}&spn=0.003381,0.017231&z=16&q=${lat},${lon}&output=embed`;
  iframe.src = newSrc;
}
// Function to update iframe src with new coordinates for Google Street View
function updateIframeSrcStreetView(lat, lon) {
  const iframe = document.getElementById("google_street_view_display");
  const newSrc = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lon}&cbp=12,0,0,0,0&output=svembed`;
  iframe.src = newSrc;
}
//Function to toggle classes of the SHOULD WE BUY/Summary decision based on API response
const textAreaName = "Should_We_Buy_Answer";
const observationYes = "Yes";
const observationNo = "No";
const yesText = document.getElementById("shouldWeBuyYesText");
const noText = document.getElementById("shouldWeBuyNoText");
function updateClassesBasedOnApiResponse(shouldWeBuyAnswer) {
  console.log("update should we buy classes function called");
  const answer = shouldWeBuyAnswer.toLowerCase();
  if (answer === "yes") {
    yesText.classList.add("yes-selected");
    noText.classList.remove("no-selected");
  } else if (answer === "no") {
    noText.classList.add("no-selected");
    yesText.classList.remove("yes-selected");
  } else {
    yesText.classList.remove("yes-selected");
    noText.classList.remove("no-selected");
  }
}
// Event listener for changes to the input field Google Earth Link
document
  .getElementById("google_earth_link")
  .addEventListener("input", function () {
    const url = this.value;
    console.log("Input URL:", url); // Debugging
    const coordinates = extractCoordinatesGoogleEarth(url);
    console.log("Extracted Coordinates:", coordinates); // Debugging
    if (coordinates) {
      updateIframeSrcGoogleEarth(coordinates.lat, coordinates.lon);
    } else {
      console.warn("Coordinates not found in the URL."); // Debugging
    }
  });
// Event listener for changes to the input field Google Street View Link
document
  .getElementById("google_street_view_link")
  .addEventListener("input", function () {
    const url = this.value;
    console.log("Input URL:", url); // Debugging
    const coordinates = extractCoordinatesGoogleStreetView(url);
    console.log("Extracted Coordinates:", coordinates); // Debugging
    if (coordinates) {
      updateIframeSrcStreetView(coordinates.lat, coordinates.lon);
    } else {
      console.warn("Coordinates not found in the URL."); // Debugging
    }
  });
//End of maps i-frame updator
document.addEventListener("DOMContentLoaded", function () {
  // Reusable function to add event listeners
  function addToggleClassEvent(
    classSelector,
    toggleClass,
    pairs
    // updateSpanColorsFlag
  ) {
    var elements = document.querySelectorAll(classSelector);

    //Function to update the colors of spans inside the elements
    // This functionality shows and hides the modules from the main page
    // function updateSpanColors() {
    //   elements.forEach(function (item) {
    //     var spans = item.querySelectorAll("span");
    //     spans.forEach(function (span) {
    //       if (item.classList.contains(toggleClass)) {
    //         // span.style.color = "white";
    //       } else {
    //         // span.style.color = ""; // Reset to default color
    //       }
    //     });
    //   });
    // }

    // Initialize all editable fields on page load

    elements.forEach(function (item) {
      item.addEventListener("click", function () {
        var isSelected = this.classList.contains(toggleClass);
        // Remove toggleClass from all elements
        elements.forEach(function (item) {
          item.classList.remove(toggleClass);
        });
        // Add toggleClass to current element if not already selected
        if (!isSelected) {
          this.classList.add(toggleClass);
        }
        // if (updateSpanColorsFlag) {
        //   updateSpanColors();
        // }

        pairs.forEach(
          function (pair) {
            var specialElement = document.getElementById(pair.tabId);
            var toggleTargetElement = document.getElementById(pair.sectionId);
            var dropDownArrow =
              specialElement.querySelector(".dropDownArrow p"); // Find the dropDownArrow span

            if (this === specialElement) {
              if (this.classList.contains(toggleClass)) {
                toggleTargetElement.classList.remove("hidden");
                toggleTargetElement.classList.add("visible");
                if (dropDownArrow) {
                  dropDownArrow.classList.add("rotate"); // Add rotate class
                }
              } else {
                toggleTargetElement.classList.add("hidden");
                toggleTargetElement.classList.remove("visible");
                if (dropDownArrow) {
                  dropDownArrow.classList.remove("rotate"); // Remove rotate class
                }
              }
            } else {
              toggleTargetElement.classList.add("hidden");
              toggleTargetElement.classList.remove("visible");
              if (dropDownArrow) {
                dropDownArrow.classList.remove("rotate"); // Remove rotate class for others
              }
            }

            toggleTargetElement.offsetHeight; // Force reflow
          }.bind(this)
        );
      });
    });

    // if (updateSpanColorsFlag) {
    //   updateSpanColors();
    // }
  }

  var tabSectionPairs = [
    {
      tabId: "conditionTab",
      sectionId: "conditionInfoSection",
    },
    {
      tabId: "marketDepthTab",
      sectionId: "marketDepthInfoSection",
    },
    {
      tabId: "locationTab",
      sectionId: "locationInfoSection",
    },
    {
      tabId: "propertyConditionTab",
      sectionId: "propertyConditionInfoSection",
    },
    {
      tabId: "risksTab",
      sectionId: "risksInfoSection",
    },
    {
      tabId: "comparablesTab",
      sectionId: "comparablesInfoSection",
    },
    {
      tabId: "estateAgentReccommendationtTab",
      sectionId: "estateAgentReccommendationtInfoSection",
    },
    {
      tabId: "shouldWeBuyTab",
      sectionId: "shouldWeBuyInfoSection",
    },
  ];
  // This handles the module level show/hide
  addToggleClassEvent(".div-block-2", "selectedgreen", tabSectionPairs, true);

  // Initially add hidden class to all section elements
  tabSectionPairs.forEach(function (pair) {
    var section = document.getElementById(pair.sectionId);
    section.classList.add("hidden");
  });

  // Toggle functionality for the sub-questions of the modules
  var tabSectionSubquestionPairs = [
    //Level Of Supply drop-down
    {
      tabId: "establishedMarketQuestion",
      sectionId: "establishedMarketSubquestionAnswer",
    },
    {
      tabId: "levelOfSupplyQuestion",
      sectionId: "levelOfNewSupplySubquestionAnswer",
    },
    { tabId: "demandQuestion", sectionId: "demandSubquestionAnswer" },
    { tabId: "localAreaQuestion", sectionId: "localAreaSubquestionAnswer" },
    {
      tabId: "propertySizeQuestion",
      sectionId: "propertySizeSubquestionAnswer",
    },
    //Sales Turnover drop-down
    {
      tabId: "propertyTurnOverQuestion",
      sectionId: "propertyTurnOverSubquestionAnswer",
    },
    {
      tabId: "supplyDemandQuestion",
      sectionId: "supplyDemandSubquestionAnswer",
    },
    {
      tabId: "marketChangeQuestion",
      sectionId: "marketChangeSubquestionAnswer",
    },
    //Level Of Demand drop-down
    {
      tabId: "affordabilityFirstTimeBuyersQuestion",
      sectionId: "affordabilityFirstTimeBuyersSubquestionAnswer",
    },
    {
      tabId: "affordabilitySecondTimeBuyersQuestion",
      sectionId: "affordabilitySecondTimeBuyersSubquestionAnswer",
    },
    {
      tabId: "listingPricesQuestion",
      sectionId: "listingPricesSubquestionAnswer",
    },
    { tabId: "riskMarketQuestion", sectionId: "riskMarketSubquestionAnswer" },
    {
      tabId: "pentUpDemandQuestion",
      sectionId: "pentUpDemandSubquestionAnswer",
    },
  ];
  addToggleClassEvent(
    ".subquestion",
    "selectedgreenSubquestions",
    tabSectionSubquestionPairs,
    false
  );
  // Initially add hidden class to all section elements
  tabSectionSubquestionPairs.forEach(function (pair) {
    var section = document.getElementById(pair.sectionId);
    section.classList.add("hidden");
  });
  // Toggle functionality for the drop-downs
  var dropDownPairs = [
    {
      tabId: "levelOfSupplyDropDownHeader",
      sectionId: "levelOfSupplyInfoSection",
    },
    {
      tabId: "salesTurnOverDropDownHeader",
      sectionId: "salesTurnOverInfoSection",
    },
    {
      tabId: "levelOfDemandDropDownHeader",
      sectionId: "levelOfDemandOverInfoSection",
    },
  ];

  addToggleClassEvent(".drop-down", "selectedgreen", dropDownPairs, false);

  // Initially add hidden class to all section elements
  dropDownPairs.forEach(function (pair) {
    var section = document.getElementById(pair.sectionId);
    section.classList.add("hidden");
  });
});

//Functionality for detecting change and passing the distance parameter to tableau components
//-------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("propertiesComparableDistance");
  // Function to update all viz-parameter elements
  function updateVizParameters(newValue) {
    const vizParameters = document.querySelectorAll(
      'viz-parameter[name="Distance"]'
    );
    vizParameters.forEach(function (vizParam) {
      vizParam.setAttribute("value", newValue);
      console.log(`Updated viz-parameter to: ${newValue}`);
    });
    refreshTableauViz();
  }
  // Function to refresh all Tableau Viz elements with class 'tableau-viz-market-depth'
  function refreshTableauViz() {
    const tableauVizElements = document.querySelectorAll(
      ".tableau-viz-market-depth"
    );
    tableauVizElements.forEach(function (tableauVizElement) {
      // Reload the Tableau Viz by re-setting the src attribute
      let src = tableauVizElement.getAttribute("src");
      tableauVizElement.setAttribute("src", src);
      console.log(`Reloaded Tableau Viz with src: ${src}`);
    });
  }
  // Event listener for input field on blur
  inputField.addEventListener("blur", function () {
    const newValue = inputField.value.trim();
    if (newValue !== "") {
      updateVizParameters(newValue);
    }
  });
});
//-------------------------------------------------------------------------------
const developmentApiGet = "http://localhost:3000/api/getRecordDetails";
const productionApiGet =
  " https://ic-tool-middleware-b0d5a7c7355b.herokuapp.com/api/getRecordDetails";

document.addEventListener("DOMContentLoaded", function () {
  if (sOppId) {
    fetch(developmentApiGet, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sOppId: sOppId }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log('Full response from middleware:', data);

        if (data && typeof data.result === "string") {
          try {
            // Parse the JSON string into an object
            const resultObj = JSON.parse(data.result);

            //capture the records ID's
            localStorage.setItem("sOppId", sOppId); // Store it in localStorage
            localStorage.setItem("propertyRecId", resultObj.propertyRecId); // Store it in localStorage
            localStorage.setItem("offerRecId", resultObj.offerRecId); // Store it in localStorage
            localStorage.setItem("productRecId", resultObj.productRecId); // Store it in localStorage
            localStorage.setItem("surveyRecId", resultObj.surveyRecId); // Store it in localStorage

            console.log("Parsed result object:", resultObj);
            // Function to format numbers with commas
            function formatNumber(num) {
              if (typeof num === "string") {
                num = parseFloat(num.replace(/[^0-9.-]+/g, ""));
              }
              return num.toLocaleString();
            }
            // Function to format the OutraOfferRange
            function formatOutraOfferRange(range) {
              const matches = range.match(/£([\d,]+) - £([\d,]+)/);
              if (matches) {
                const formattedMin = formatNumber(matches[1]);
                const formattedMax = formatNumber(matches[2]);
                return `£${formattedMin} - £${formattedMax}`;
              }
              return range;
            }
            // Function to update all viz-parameter elements
            function updateVizParameters(name, value) {
              const vizParameters = document.querySelectorAll(
                `viz-parameter[name="${name}"]`
              );
              vizParameters.forEach(function (vizParam) {
                vizParam.setAttribute("value", value);
                console.log(`Updated viz-parameter ${name} to: ${value}`);
              });
            }
            // Function to update all viz-filter elements
            function updateVizFilters(field, value) {
              const vizFilters = document.querySelectorAll(
                `viz-filter[field="${field}"]`
              );
              vizFilters.forEach(function (vizFilter) {
                vizFilter.setAttribute("value", value);
                console.log(`Updated viz-filter ${field} to: ${value}`);
              });
            }
            // Function to format the date to a readable format
            function formatDate(dateString) {
              const date = new Date(dateString);
              return date.toLocaleDateString();
            }
            //

            // Update the HTML elements with formatted values
            document.getElementById("propertyAddress").textContent =
              resultObj.street || "-";
            document.getElementById("propertyPostcode").textContent =
              resultObj.propertyPostcode || "-";
            // document.getElementById("propertyType").textContent =
            //   resultObj.propertyType || "-";
            setDropdownValue("propertyType", resultObj.propertyType || "");
            // document.getElementById("propertyStyle").textContent =
            //   resultObj.propertyStyle || "-";
            setDropdownValue("propertyStyle", resultObj.propertyStyle || "");
            // document.getElementById("propertyBedrooms").textContent =
            //   resultObj.bedrooms || "-";
            setDropdownValue("propertyBedrooms", resultObj.bedrooms || "");
            // document.getElementById("propertyBathrooms").textContent =
            //   resultObj.bathrooms || "-";
            setDropdownValue("propertyBathrooms", resultObj.bathrooms || "");
            document.getElementById("propertyFloorArea").textContent =
              resultObj.floorArea || "-";
            if (resultObj.lastSaleDate == "-" || !resultObj.lastSaleDate) {
              document.getElementById("lastSaleDate").textContent = "-";
            } else {
              document.getElementById("lastSaleDate").textContent =
                formatDate(resultObj.lastSaleDate) || "-";
            }
            if (resultObj.lastSalePrice == "-" || !resultObj.lastSalePrice) {
              document.getElementById("lastSalePrice").textContent = "-";
            } else {
              document.getElementById("lastSalePrice").textContent =
                "£" + formatNumber(resultObj.lastSalePrice) || "£-";
            }
            document.getElementById("propertyGardenArea").textContent =
              resultObj.gardenArea || "-";
            // document.getElementById("propertyParking").textContent =
            //   resultObj.parking || "-";
            setDropdownValue("propertyParking", resultObj.parking || "");
            // document.getElementById("propertyTenure").textContent =
            //   resultObj.tenure || "-";
            setDropdownValue("propertyTenure", resultObj.tenure || "");
            document.getElementById("outraOfferRange").textContent =
              formatOutraOfferRange(resultObj.OutraOfferRange) || "-";
            //Outra Valuation
            document.getElementById("outraValuation").textContent =
              "£" + formatNumber(resultObj.outraValuation) || "-";
            //Indicative Valuation
            document.getElementById("Indicative_Valuation").textContent =
              "£" + formatNumber(resultObj.Indicative_Valuation) || "-";
            document.getElementById("Indicative_Offer_Lower").textContent =
              "£" + formatNumber(resultObj.indicativeOffer) || "-";
            document.getElementById("Upstix_Assessed_Value").textContent =
              "£" + formatNumber(resultObj.uwValuation) || "-";
            document.getElementById("IC1_Proposed_Offer").textContent =
              "£" + formatNumber(resultObj.uwOffer) || "-";
            document.getElementById("180DayValuation").textContent =
              "£" + formatNumber(resultObj["180DayValuation"]) || "-";

            //SHOULD WE BUY/Summary MODULE------------------------------------------------------------------------------------
            //
            document.getElementById("IC1_Proposed_Offer1").textContent =
              "£" + formatNumber(resultObj.uwOffer) || "-";
            //
            //Update Should we buy/summary decision

            // Update the classes based on the simulated API response
            if (resultObj.creatorRecord[0].Should_We_Buy_Answer) {
              updateClassesBasedOnApiResponse(
                resultObj.creatorRecord[0].Should_We_Buy_Answer
              );
            }
            //Approved By
            document.getElementById(
              "UW_Observation_Should_We_Buy_Approved_By"
            ).textContent = resultObj.creatorRecord[0].Approved_By || "";
            //
            //Gross Flip Margin
            document.getElementById(
              "UW_Observation_Should_We_Buy_Gross_Flip_Margin"
            ).textContent = resultObj.creatorRecord[0].Gross_Flip_Margin || "-";
            //
            //Net Flip Margin
            document.getElementById(
              "UW_Observation_Should_We_Buy_Net_Flip_Margin"
            ).textContent = resultObj.creatorRecord[0].Net_Flip_Margin || "-";
            //
            //Net Profit
            document.getElementById(
              "UW_Observation_Should_We_Buy_Net_Profit"
            ).textContent = resultObj.creatorRecord[0].Net_Profit || "-";
            //
            //Profit Share Percentage
            document.getElementById("Profit_Share").textContent =
              resultObj.Profit_Share || "";
            //
            //Profit Share Threshold
            document.getElementById(
              "Profit_Share_Applicable_Above"
            ).textContent = resultObj.Profit_Share_Applicable_Above || "";
            //
            //Stamp Duty Paid On Purchase
            setDropdownValue(
              "UW_Observation_Should_We_Buy_Stamp_Duty_Paid",
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_Stamp_Duty_Paid
            );
            //
            //If no SDLT, Why
            setDropdownValue(
              "UW_Observation_Should_We_Buy_No_SDLT_Why",
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_No_SDLT_Why
            );
            //
            //Special Terms
            document.getElementById(
              "UW_Observation_Should_We_Buy_Special_Terms"
            ).textContent =
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_Special_Terms || "";
            //
            //Recommended Estate Agent
            document.getElementById(
              "UW_Observation_Should_We_Buy_Recommended_Estate_Agent"
            ).textContent =
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_Recommended_Estate_Agent || "";
            //
            //Contact Name (person at EA)
            document.getElementById(
              "UW_Observation_Should_We_Buy_Contact_Name"
            ).textContent =
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_Contact_Name || "";
            //
            //Asking Price
            if (
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_Asking_Price
            ) {
              document.getElementById(
                "UW_Observation_Should_We_Buy_Asking_Price"
              ).textContent =
                "£" +
                formatNumber(
                  resultObj.creatorRecord[0]
                    .UW_Observation_Should_We_Buy_Asking_Price
                );
            } else {
              document.getElementById(
                "UW_Observation_Should_We_Buy_Asking_Price"
              ).textContent = "-";
            }
            //
            //Prefix
            setDropdownValue(
              "UW_Observation_Should_We_Buy_Prefix",
              resultObj.creatorRecord[0].UW_Observation_Should_We_Buy_Prefix
            );
            //
            //------------------------------------------------------------------------------------
            //Comments and Stars ratings data
            //CONDITION -------------------------------------------------------------------------------------
            //General Answered Questions/ Questions Count & Overall Rating
            // Check if creatorRecord array exists and has at least one element
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].conditionModuleRating
            ) {
              // Safely access conditionAnsweredQuestions and conditionTotalQuestions
              document.getElementById(
                "conditionAnsweredQuestions"
              ).textContent =
                resultObj.creatorRecord[0].conditionModuleRating
                  .conditionAnsweredQuestions || 0;

              document.getElementById("conditionTotalQuestions").textContent =
                resultObj.creatorRecord[0].conditionModuleRating
                  .conditionTotalQuestions || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for conditionAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById(
                "conditionAnsweredQuestions"
              ).textContent = 0; // Default value
              document.getElementById("conditionTotalQuestions").textContent =
                ""; // Default value
            }

            //FILL AVERAGE STARS RATING FOR CONDITION
            // Check if creatorRecord array exists, has at least one element, and conditionModuleRating exists
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].conditionModuleRating &&
              typeof resultObj.creatorRecord[0].conditionModuleRating
                .conditionAverageRating !== "undefined"
            ) {
              // Safely access conditionAverageRating and use it in fillStars function
              fillStars(
                "conditionStarsRating",
                resultObj.creatorRecord[0].conditionModuleRating
                  .conditionAverageRating
              );
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for CONDITION STARS RATING is missing or undefined."
              );
              // Optionally, you can provide a default behavior here, like setting a default star rating or leaving it empty.
            }

            //Internal
            document.getElementById("UW_Observation_Condition_Internal").value =
              resultObj.creatorRecord[0].UW_Observation_Condition_Internal ||
              "";
            document
              .getElementById("UW_Stars_Assessment_Condition_Internal")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Condition_Internal
              );
            //
            //External
            document.getElementById("UW_Observation_Condition_External").value =
              resultObj.creatorRecord[0].UW_Observation_Condition_External ||
              "";
            document
              .getElementById("UW_Stars_Assessment_Condition_External")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Condition_External
              );
            //
            //Garden
            document.getElementById("UW_Observation_Condition_Garden").value =
              resultObj.creatorRecord[0].UW_Observation_Condition_Garden || "";
            document
              .getElementById("UW_Stars_Assessment_Condition_Garden")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Condition_Garden
              );
            //
            //Parking
            document.getElementById("UW_Observation_Condition_Parking").value =
              resultObj.creatorRecord[0].UW_Observation_Condition_Parking || "";
            document
              .getElementById("UW_Stars_Assessment_Condition_Parking")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Condition_Parking
              );
            //
            //Flooring
            document.getElementById("UW_Observation_Condition_Flooring").value =
              resultObj.creatorRecord[0].UW_Observation_Condition_Flooring ||
              "";
            document
              .getElementById("UW_Stars_Assessment_Condition_Flooring")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Condition_Flooring
              );
            //
            //END OF CONDITION -------------------------------------------------------------------------------------
            //MARKET DEPTH -------------------------------------------------------------------------------------
            //LEVEL OF SUPPLY DROPDOWN
            //Established Market
            document.getElementById("UW_Observation_Established_Market").value =
              resultObj.creatorRecord[0].UW_Observation_Established_Market ||
              "";
            document
              .getElementById("UW_Stars_Assessment_Established_Market")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Established_Market
              );
            //Market Supply
            document.getElementById("UW_Observation_Level_Of_Supply").value =
              resultObj.creatorRecord[0].UW_Observation_Level_Of_Supply || "";
            document
              .getElementById("UW_Stars_Assessment_Level_Of_Supply")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Level_Of_Supply || 0
              );
            //Market Demand
            document.getElementById("UW_Observation_Level_Of_Demand").value =
              resultObj.creatorRecord[0].UW_Observation_Level_Of_Demand || "";
            document
              .getElementById("UW_Stars_Assessment_Level_Of_Demand")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Level_Of_Demand || 0
              );
            //Area Attractiveness
            document.getElementById("UW_Observation_Local_Area").value =
              resultObj.creatorRecord[0].UW_Observation_Local_Area || "";
            document
              .getElementById("UW_Stars_Assessment_Local_Area")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Local_Area || 0
              );
            //Property Size
            document.getElementById("UW_Observation_Property_Size").value =
              resultObj.creatorRecord[0].UW_Observation_Property_Size || "";
            document
              .getElementById("UW_Stars_Assessment_Property_Size")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Property_Size ||
                  0
              );
            //SALES TURNOVER DROPDOWN
            //Property Turnover
            document.getElementById("UW_Observation_Property_Turn_Over").value =
              resultObj.creatorRecord[0].UW_Observation_Property_Turn_Over ||
              "";
            document
              .getElementById("UW_Stars_Assessment_Property_Turn_Over")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Property_Turn_Over
              );
            //
            //Supply & Demand
            document.getElementById("UW_Observation_Supply_Demand").value =
              resultObj.creatorRecord[0].UW_Observation_Supply_Demand || "";
            document
              .getElementById("UW_Stars_Assessment_Supply_Demand")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Supply_Demand
              );
            //
            //Market Change
            document.getElementById("UW_Observation_Market_Change").value =
              resultObj.creatorRecord[0].UW_Observation_Market_Change || "";
            document
              .getElementById("UW_Stars_Assessment_Market_Change")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Market_Change
              );
            //
            //LEVEL OF DEMAND DROPDOWN
            //First Time Buyers Affordability
            document.getElementById(
              "UW_Observation_Affordability_First_Time_Buyers"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Affordability_First_Time_Buyers || "";
            document
              .getElementById(
                "UW_Stars_Assessment_Affordability_First_Time_Buyers"
              )
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Affordability_First_Time_Buyers
              );
            //
            //Second Time Buyers Affordability
            document.getElementById(
              "UW_Observation_Affordability_Second_Time_Buyers"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Affordability_Second_Time_Buyers || "";
            document
              .getElementById(
                "UW_Stars_Assessment_Affordability_Second_Time_Buyers"
              )
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Affordability_Second_Time_Buyers
              );
            //
            //Listing Price
            document.getElementById("UW_Observation_Listing_Price").value =
              resultObj.creatorRecord[0].UW_Observation_Listing_Price || "";
            document
              .getElementById("UW_Stars_Assessment_Listing_Price")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Listing_Price
              );
            //
            //Risk Market
            document.getElementById("UW_Observation_Risk_Market").value =
              resultObj.creatorRecord[0].UW_Observation_Risk_Market || "";
            document
              .getElementById("UW_Stars_Assessment_Risk_Market")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Risk_Market
              );
            //
            //Pent Up Demand
            document.getElementById("UW_Observation_Pent_Up_Demand").value =
              resultObj.creatorRecord[0].UW_Observation_Pent_Up_Demand || "";
            document
              .getElementById("UW_Stars_Assessment_Pent_Up_Demand")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Pent_Up_Demand
              );
            //
            //SET STARS RATING AVERAGE AND ANSWERED QUESTIONS FOR MARKET DEPTH MODULE
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].marketDepthModuleRating
            ) {
              // Safely access marketDepthAnsweredQuestions and marketDepthTotalQuestions
              document.getElementById(
                "marketDepthAnsweredQuestions"
              ).textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .marketDepthAnsweredQuestions || 0;

              document.getElementById("marketDepthTotalQuestions").textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .marketDepthTotalQuestions || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for marketDepthAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById(
                "marketDepthAnsweredQuestions"
              ).textContent = 0; // Default value
              document.getElementById("marketDepthTotalQuestions").textContent =
                ""; // Default value
            }

            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].marketDepthModuleRating &&
              typeof resultObj.creatorRecord[0].marketDepthModuleRating
                .marketDepthAverageRating !== "undefined"
            ) {
              // Safely access marketDepthAverageRating and log it
              const marketDepthAverageRating =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .marketDepthAverageRating;
              console.log(
                "marketDepth Average Rating:",
                marketDepthAverageRating
              );

              // Ensure the element exists before calling fillStars
              const marketDepthStarsRatingElement = document.getElementById(
                "marketDepthStarsRating"
              );
              if (!marketDepthStarsRatingElement) {
                console.error(
                  "Element with ID 'marketDepthStarsRating' not found."
                );
                return;
              }

              // Call fillStars with the valid element and rating
              fillStars("marketDepthStarsRating", marketDepthAverageRating);
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for marketDepth STARS RATING is missing or undefined."
              );
            }
            //
            //Set TOTAL Questions and Answered Questions for the Market Depth drop-downs
            //SET STARS RATING AVERAGE AND ANSWERED QUESTIONS FOR MARKET DEPTH MODULE
            //Level Of Supply
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].marketDepthModuleRating
                .levelOfSupplyDropDownAnsweredQuestions &&
              resultObj.creatorRecord[0].marketDepthModuleRating
                .levelOfSupplyDropDownQuestionsCounter
            ) {
              // Safely access marketDepthAnsweredQuestions and marketDepthTotalQuestions
              document.getElementById(
                "levelOfSupplyAnsweredQuestions"
              ).textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .levelOfSupplyDropDownAnsweredQuestions || 0;

              document.getElementById(
                "levelOfSupplyTotalQuestions"
              ).textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .levelOfSupplyDropDownQuestionsCounter || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for levelOfSupplyAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById(
                "levelOfSupplyAnsweredQuestions"
              ).textContent = 0; // Default value
              document.getElementById(
                "levelOfSupplyTotalQuestions"
              ).textContent = ""; // Default value
            }
            //
            //Sales TurnOver
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].marketDepthModuleRating
                .salesTurnOverDropDownAnsweredQuestions &&
              resultObj.creatorRecord[0].marketDepthModuleRating
                .salesTurnOverDropDownQuestionsCounter
            ) {
              // Safely access marketDepthAnsweredQuestions and marketDepthTotalQuestions
              document.getElementById(
                "salesTurnOverAnsweredQuestions"
              ).textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .salesTurnOverDropDownAnsweredQuestions || 0;

              document.getElementById(
                "salesTurnOverTotalQuestions"
              ).textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .salesTurnOverDropDownQuestionsCounter || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for salesTurnOverAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById(
                "salesTurnOverAnsweredQuestions"
              ).textContent = 0; // Default value
              document.getElementById(
                "salesTurnOverTotalQuestions"
              ).textContent = ""; // Default value
            }
            //
            //Level Of Demand
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].marketDepthModuleRating
                .levelOfDemandDropDownAnsweredQuestions &&
              resultObj.creatorRecord[0].marketDepthModuleRating
                .levelOfDemandDropDownQuestionsCounter
            ) {
              // Safely access marketDepthAnsweredQuestions and marketDepthTotalQuestions
              document.getElementById(
                "levelOfDemandAnsweredQuestions"
              ).textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .levelOfDemandDropDownAnsweredQuestions || 0;

              document.getElementById(
                "levelOfDemandTotalQuestions"
              ).textContent =
                resultObj.creatorRecord[0].marketDepthModuleRating
                  .levelOfDemandDropDownQuestionsCounter || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for levelOfDemandAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById(
                "levelOfDemandAnsweredQuestions"
              ).textContent = 0; // Default value
              document.getElementById(
                "levelOfDemandTotalQuestions"
              ).textContent = ""; // Default value
            }
            //
            //END OF MARKET DEPTH -------------------------------------------------------------------------------------
            //LOCATION  -------------------------------------------------------------------------------------
            //Position On Street
            document.getElementById(
              "UW_Observation_Location_Street_Position"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Location_Street_Position || "";
            document
              .getElementById("UW_Stars_Assessment_Location_Street_Position")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Location_Street_Position
              );
            //
            //Proximity to amenities
            document.getElementById(
              "UW_Observation_Location_Proximity_To_Amenities"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Location_Proximity_To_Amenities || "";
            document
              .getElementById(
                "UW_Stars_Assessment_Location_Proximity_To_Amenities"
              )
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Location_Proximity_To_Amenities
              );
            //
            //Proximity to schools
            document.getElementById(
              "UW_Observation_Location_Proximity_To_Schools"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Location_Proximity_To_Schools || "";
            document
              .getElementById(
                "UW_Stars_Assessment_Location_Proximity_To_Schools"
              )
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Location_Proximity_To_Schools
              );
            //
            //Is the road outside very busy
            document.getElementById(
              "UW_Observation_Location_Outside_Road"
            ).value =
              resultObj.creatorRecord[0].UW_Observation_Location_Outside_Road ||
              "";
            document
              .getElementById("UW_Stars_Assessment_Location_Outside_Road")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Location_Outside_Road
              );
            //
            //Proximity to social housing
            document.getElementById(
              "UW_Observation_Location_Proximity_To_Social_Housing"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Location_Proximity_To_Social_Housing || "";
            document
              .getElementById(
                "UW_Stars_Assessment_Location_Proximity_To_Social_Housing"
              )
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0]
                  .UW_Stars_Assessment_Location_Proximity_To_Social_Housing
              );
            //SET STARS RATING AVERAGE AND ANSWERED QUESTIONS FOR LOCATION MODULE
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].locationModuleRating
            ) {
              // Safely access locationAnsweredQuestions and locationTotalQuestions
              document.getElementById("locationAnsweredQuestions").textContent =
                resultObj.creatorRecord[0].locationModuleRating
                  .locationAnsweredQuestions || 0;

              document.getElementById("locationTotalQuestions").textContent =
                resultObj.creatorRecord[0].locationModuleRating
                  .locationTotalQuestions || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for locationAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById(
                "locationAnsweredQuestions"
              ).textContent = 0; // Default value
              document.getElementById("locationTotalQuestions").textContent =
                ""; // Default value
            }

            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].locationModuleRating &&
              typeof resultObj.creatorRecord[0].locationModuleRating
                .locationAverageRating !== "undefined"
            ) {
              // Safely access locationAverageRating and log it
              const locationAverageRating =
                resultObj.creatorRecord[0].locationModuleRating
                  .locationAverageRating;
              console.log("location Average Rating:", locationAverageRating);

              // Ensure the element exists before calling fillStars
              const locationStarsRatingElement = document.getElementById(
                "locationStarsRating"
              );
              if (!locationStarsRatingElement) {
                console.error(
                  "Element with ID 'locationStarsRating' not found."
                );
                return;
              }

              // Call fillStars with the valid element and rating
              fillStars("locationStarsRating", locationAverageRating);
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for location STARS RATING is missing or undefined."
              );
            }
            //END OF LOCATION -------------------------------------------------------------------------------------
            //EXTERNAL REPORTS -------------------------------------------------------------------------------------
            //END OF EXTERNAL REPORTS -------------------------------------------------------------------------------------
            //RISKS -------------------------------------------------------------------------------------
            //Risk 1
            document.getElementById("UW_Observation_Risks_1").value =
              resultObj.creatorRecord[0].UW_Observation_Risks_1 || "";
            document
              .getElementById("UW_Stars_Assessment_Risks_1")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Risks_1
              );
            //
            //Risk 2
            document.getElementById("UW_Observation_Risks_2").value =
              resultObj.creatorRecord[0].UW_Observation_Risks_2 || "";
            document
              .getElementById("UW_Stars_Assessment_Risks_2")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Risks_2
              );
            //
            //Risk 3
            document.getElementById("UW_Observation_Risks_3").value =
              resultObj.creatorRecord[0].UW_Observation_Risks_3 || "";
            document
              .getElementById("UW_Stars_Assessment_Risks_3")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Risks_3
              );
            //
            //Risk 4
            document.getElementById("UW_Observation_Risks_4").value =
              resultObj.creatorRecord[0].UW_Observation_Risks_4 || "";
            document
              .getElementById("UW_Stars_Assessment_Risks_4")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Risks_4
              );
            //
            //Risk 5
            document.getElementById("UW_Observation_Risks_5").value =
              resultObj.creatorRecord[0].UW_Observation_Risks_5 || "";
            document
              .getElementById("UW_Stars_Assessment_Risks_5")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Risks_5
              );
            // SET STARS RATING AND AVERAGE SCORE FOR RISKS
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].risksModuleRating
            ) {
              // Safely access risksAnsweredQuestions and risksTotalQuestions
              document.getElementById("risksAnsweredQuestions").textContent =
                resultObj.creatorRecord[0].risksModuleRating
                  .risksAnsweredQuestions || 0;

              document.getElementById("risksTotalQuestions").textContent =
                resultObj.creatorRecord[0].risksModuleRating
                  .risksTotalQuestions || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for risksAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById("risksAnsweredQuestions").textContent = 0; // Default value
              document.getElementById("risksTotalQuestions").textContent = ""; // Default value
            }

            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].risksModuleRating &&
              typeof resultObj.creatorRecord[0].risksModuleRating
                .risksAverageRating !== "undefined"
            ) {
              // Safely access risksAverageRating and log it
              const risksAverageRating =
                resultObj.creatorRecord[0].risksModuleRating.risksAverageRating;
              console.log("Risks Average Rating:", risksAverageRating);

              // Ensure the element exists before calling fillStars
              const risksStarsRatingElement =
                document.getElementById("risksStarsRating");
              if (!risksStarsRatingElement) {
                console.error("Element with ID 'risksStarsRating' not found.");
                return;
              }

              // Call fillStars with the valid element and rating
              fillStars("risksStarsRating", risksAverageRating);
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for risks STARS RATING is missing or undefined."
              );
            }
            //END OF RISKS -------------------------------------------------------------------------------------
            //COMPARABLES -------------------------------------------------------------------------------------
            //Comparable 1
            document.getElementById("UW_Observation_Comparables_1").value =
              resultObj.creatorRecord[0].UW_Observation_Comparables_1 || "";
            //
            document
              .getElementById("UW_Stars_Assessment_Comparables_1")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Comparables_1
              );
            //
            document.getElementById(
              "UW_Observation_Comparables_1_Asking_Price"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_1_Asking_Price || "";
            //
            document.getElementById(
              "UW_Observation_Comparables_1_Achieved_Price"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_1_Achieved_Price || "";
            //
            document.getElementById(
              "UW_Observation_Comparables_1_Link_To_Property"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_1_Link_To_Property || "";
            //
            //Comparable 2
            document.getElementById("UW_Observation_Comparables_2").value =
              resultObj.creatorRecord[0].UW_Observation_Comparables_2 || "";
            //
            document
              .getElementById("UW_Stars_Assessment_Comparables_2")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Comparables_2
              );
            //
            document.getElementById(
              "UW_Observation_Comparables_2_Asking_Price"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_2_Asking_Price || "";
            //
            document.getElementById(
              "UW_Observation_Comparables_2_Achieved_Price"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_2_Achieved_Price || "";
            //
            document.getElementById(
              "UW_Observation_Comparables_2_Link_To_Property"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_2_Link_To_Property || "";
            //
            //Comparable 3
            document.getElementById("UW_Observation_Comparables_3").value =
              resultObj.creatorRecord[0].UW_Observation_Comparables_3 || "";
            //
            document
              .getElementById("UW_Stars_Assessment_Comparables_3")
              .setAttribute(
                "data-initial-rating",
                resultObj.creatorRecord[0].UW_Stars_Assessment_Comparables_3
              );
            //
            document.getElementById(
              "UW_Observation_Comparables_3_Asking_Price"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_3_Asking_Price || "";
            //
            document.getElementById(
              "UW_Observation_Comparables_3_Achieved_Price"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_3_Achieved_Price || "";
            //
            document.getElementById(
              "UW_Observation_Comparables_3_Link_To_Property"
            ).value =
              resultObj.creatorRecord[0]
                .UW_Observation_Comparables_3_Link_To_Property || "";
            //
            //SET STARS RATING AVERAGE AND ANSWERED QUESTIONS FOR COMPARABLES MODULE
            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].comparablesModuleRating
            ) {
              // Safely access comparablesAnsweredQuestions and comparablesTotalQuestions
              document.getElementById(
                "comparablesAnsweredQuestions"
              ).textContent =
                resultObj.creatorRecord[0].comparablesModuleRating
                  .comparablesAnsweredQuestions || 0;

              document.getElementById("comparablesTotalQuestions").textContent =
                resultObj.creatorRecord[0].comparablesModuleRating
                  .comparablesTotalQuestions || "";
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for comparablesAnsweredQuestions is missing or undefined. Setting it to default (0)"
              );
              document.getElementById(
                "comparablesAnsweredQuestions"
              ).textContent = 0; // Default value
              document.getElementById("comparablesTotalQuestions").textContent =
                ""; // Default value
            }

            if (
              resultObj.creatorRecord &&
              Array.isArray(resultObj.creatorRecord) &&
              resultObj.creatorRecord.length > 0 &&
              resultObj.creatorRecord[0].comparablesModuleRating &&
              typeof resultObj.creatorRecord[0].comparablesModuleRating
                .comparablesAverageRating !== "undefined"
            ) {
              // Safely access comparablesAverageRating and log it
              const comparablesAverageRating =
                resultObj.creatorRecord[0].comparablesModuleRating
                  .comparablesAverageRating;
              console.log(
                "comparables Average Rating:",
                comparablesAverageRating
              );

              // Ensure the element exists before calling fillStars
              const comparablesStarsRatingElement = document.getElementById(
                "comparablesStarsRating"
              );
              if (!comparablesStarsRatingElement) {
                console.error(
                  "Element with ID 'comparablesStarsRating' not found."
                );
                return;
              }

              // Call fillStars with the valid element and rating
              fillStars("comparablesStarsRating", comparablesAverageRating);
            } else {
              // Handle the case where the necessary data is missing
              console.warn(
                "Required data for comparables STARS RATING is missing or undefined."
              );
            }
            //END OF COMPARABLES -------------------------------------------------------------------------------------
            //ESTATE AGENT RECOMMENDATION -------------------------------------------------------------------------------------
            //END OF ESTATE AGENT RECOMMENDATION -------------------------------------------------------------------------------------
            //------------------------------------------------------------------------------------------------------------
            // General fields from Creator DB
            //Comments
            document.getElementById("Indicative_Offer_Justification").value =
              resultObj.Comments || "";
            //Currently on the market link
            const currentlyOnTheMarket =
              resultObj.creatorRecord[0].currently_on_the_market || "";
            initializeEditableLinkField(
              currentlyOnTheMarket,
              "currently_on_the_market",
              "linkDisplayCurrentlyOnTheMarket",
              "editableLinkCurrentlyOnTheMarket",
              "editLinkButtonCurrentlyOnTheMarket"
            );
            //Google Earth Link
            const googleEarthLink =
              resultObj.creatorRecord[0].google_earth_link || "";
            initializeEditableLinkField(
              googleEarthLink,
              "google_earth_link",
              "linkDisplayGoogleEarthLink",
              "editableLinkGoogleEarthLink",
              "editLinkButtonGoogleEarthLink"
            );
            //Google Street View Link
            const googleStreetViewLink =
              resultObj.creatorRecord[0].google_street_view_link || "";
            initializeEditableLinkField(
              googleStreetViewLink,
              "google_street_view_link",
              "linkDisplayGoogleStreetViewLink",
              "editableLinkGoogleStreetViewLink",
              "editLinkButtonGoogleStreetViewLink"
            );

            //------------------------------------------------------------------------------------------------------------
            // Update Tableau viz-parameter elements
            updateVizParameters("select_uprn", resultObj.uprn || "N/A");
            updateVizParameters("geolat", resultObj.latitude || "0"); // Use 'latitude' if 'lattitude' was a typo
            updateVizParameters("geolon", resultObj.longitude || "0"); // Use 'longitude' if 'longtitude' was a typo
            //Pass Lat and Long to Google Earth and Google Street view Link
            if (
              resultObj.latitude &&
              resultObj.latitude != 0 &&
              resultObj.longitude &&
              resultObj.longitude != 0
            ) {
              //Update Google Earth display
              updateIframeSrcGoogleEarth(
                resultObj.latitude,
                resultObj.longitude
              );
              //Update Google Street View display
              updateIframeSrcStreetView(
                resultObj.latitude,
                resultObj.longitude
              );
            }
            //This functionality updates the street view upon load if we have a link already in creator rec.
            // Google Street View update on load
            if (
              resultObj.creatorRecord[0].google_street_view_link &&
              !resultObj.creatorRecord[0].google_street_view_link == ""
            ) {
              const url =
                resultObj.creatorRecord[0].google_street_view_link.trim();
              console.log("Input URL:", url); // Debugging
              const coordinates = extractCoordinatesGoogleStreetView(url);
              console.log(
                "Extracted Coordinates for Google Street View Upon Load:",
                coordinates
              ); // Debugging
              if (coordinates) {
                updateIframeSrcStreetView(coordinates.lat, coordinates.lon);
              } else {
                console.warn(
                  "Google Street View Coordinates not found in the URL."
                ); // Debugging
              }
            }

            if (
              resultObj.creatorRecord[0].google_earth_link &&
              !resultObj.creatorRecord[0].google_earth_link == ""
            ) {
              const url = resultObj.creatorRecord[0].google_earth_link.trim();
              console.log("Input URL:", url); // Debugging
              const coordinates = extractCoordinatesGoogleEarth(url);
              console.log(
                "Extracted Coordinates for Google Earth View Upon Load:",
                coordinates
              ); // Debugging
              if (coordinates) {
                updateIframeSrcGoogleEarth(coordinates.lat, coordinates.lon);
              } else {
                console.warn("Google Earth Coordinates not found in the URL."); // Debugging
              }
            }
            // Update Tableau viz-filter elements
            updateVizFilters("Bedroom", resultObj.bedrooms + " Bed" || "N/A");
            updateVizFilters("Property Type", resultObj.propertyType || "N/A");
            updateVizFilters(
              "Property Style",
              resultObj.propertyStyle || "N/A"
            );

            // Function to refresh all Tableau Viz elements with class 'tableau-viz-market-depth'
            function refreshTableauViz() {
              const tableauVizElements = document.querySelectorAll(
                ".tableau-viz-market-depth"
              );
              tableauVizElements.forEach(function (tableauVizElement) {
                // Reload the Tableau Viz by re-setting the src attribute
                let src = tableauVizElement.getAttribute("src");
                tableauVizElement.setAttribute("src", src);
                console.log(`Reloaded Tableau Viz with src: ${src}`);
              });
            }
            // Call the function to refresh Tableau Viz elements
            refreshTableauViz();
          } catch (error) {
            console.error("Error parsing result JSON:", error);
          }
        } else {
          console.error("data.result is not a valid JSON string");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.error("sOppId query parameter not found in the URL");
  }
});
//-------------------------------------------------------------------------------
//Functionality with Stars Ratings
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    // Function to handle general star rating
    function initializeStarRating(container) {
      const initialRating = container.getAttribute("data-initial-rating") || 0;
      let ratingValue = initialRating;
      const stars = container.querySelectorAll(".star");

      updateStarColors(ratingValue);

      stars.forEach((star) => {
        star.addEventListener("click", function () {
          ratingValue = this.getAttribute("data-value");
          updateStarColors(ratingValue);
          console.log(
            `Rating Value: ${ratingValue} - Container: ${container.dataset.rating}`
          );
          saveObservationRating(sOppId, container.dataset.rating, ratingValue);
        });
        star.addEventListener("mouseover", function () {
          updateStarColors(this.getAttribute("data-value"));
        });
        star.addEventListener("mouseout", function () {
          updateStarColors(ratingValue);
        });
      });

      function updateStarColors(rating) {
        stars.forEach((star) => {
          const starValue = star.getAttribute("data-value");
          if (starValue <= rating) {
            star.classList.add("green");
            star.classList.remove("red");
          } else {
            star.classList.remove("green");
            star.classList.remove("red");
          }
        });
      }
    }

    // Function to handle risk-specific star rating
    function initializeRiskStarRating(container) {
      const initialRating = container.getAttribute("data-initial-rating") || 0;
      let ratingValue = initialRating;
      const stars = container.querySelectorAll(".star");

      updateRiskStarColors(ratingValue);

      stars.forEach((star) => {
        star.addEventListener("click", function () {
          ratingValue = this.getAttribute("data-value");
          updateRiskStarColors(ratingValue);
          console.log(
            `Risk Rating Value: ${ratingValue} - Container: ${container.dataset.rating}`
          );
          saveObservationRating(sOppId, container.dataset.rating, ratingValue);
        });
        star.addEventListener("mouseover", function () {
          updateRiskStarColors(this.getAttribute("data-value"));
        });
        star.addEventListener("mouseout", function () {
          updateRiskStarColors(ratingValue);
        });
      });

      function updateRiskStarColors(rating) {
        stars.forEach((star) => {
          const starValue = star.getAttribute("data-value");
          if (starValue <= rating) {
            if (rating <= 2) {
              star.classList.add("green");
              star.classList.remove("red");
            } else {
              star.classList.add("red");
              star.classList.remove("green");
            }
          } else {
            star.classList.remove("green");
            star.classList.remove("red");
          }
        });
      }
    }

    //Should we buy decision functionality
    yesText.addEventListener("click", function () {
      if (!this.classList.contains("yes-selected")) {
        this.classList.add("yes-selected");
        noText.classList.remove("no-selected");
      } else {
        this.classList.remove("yes-selected");
      }
      saveObservationRating(sOppId, textAreaName, observationYes);
    });

    noText.addEventListener("click", function () {
      if (!this.classList.contains("no-selected")) {
        this.classList.add("no-selected");
        yesText.classList.remove("yes-selected");
      } else {
        this.classList.remove("no-selected");
      }
      saveObservationRating(sOppId, textAreaName, observationNo);
    });
    //----------------------------------------------------------------------------

    // Initialize general star ratings
    document.querySelectorAll(".rating-container").forEach((container) => {
      initializeStarRating(container);
    });

    // Initialize risk-specific star ratings
    document.querySelectorAll(".risk-rating-container").forEach((container) => {
      initializeRiskStarRating(container);
    });

    // Function to initialize text areas
    // function initializeTextAreas() {
    //   const textAreas = document.querySelectorAll(
    //     ".observationsComment, .linksComment, .comparablesComment, .shouldWeBuyAnswer, .dropDown, .crmValues, .crmValuesComment, .crmValuesFrontPage, .dropDownKeyFeatures"
    //   );

    //   textAreas.forEach((textArea) => {
    //     const initialObservation = textArea.value || "";
    //     textArea.value = initialObservation; // Set the initial value

    //     textArea.addEventListener("change", function () {
    //       //Need to extract module,recordid, fieldtoUpdate and valueofFieldtoUpdate
    //       recordId = textArea.getAttribute("idToUse"); // This will look like this in the HTML  idToUse="sOppId"

    //       if (recordId === "sOppId") {
    //         recordId = sOppId; // Use the constant sOppId value
    //       }

    //       if (recordId === "offerRecId") {
    //         recordId = offerRecId; // Use the constant offerRecId value
    //       }

    //       if (recordId === "propertyRecId") {
    //         recordId = propertyRecId; // Use the constant propertyRecId value
    //       }

    //       if (recordId === "productRecId") {
    //         recordId = productRecId; // Use the constant productRecId value
    //       }

    //       if (recordId === "surveyRecId") {
    //         recordId = surveyRecId; // Use the constant surveyRecId value
    //       }

    //       const moduleToUpdate = textArea.getAttribute("moduleToUpdate"); // Correctly fetch moduleToUpdate attribute
    //       const fieldToUpdate = textArea.getAttribute("fieldToUpdate"); // Correctly fetch fieldName attribute

    //       if (textArea.classList.contains("crmValues")) {
    //         valueOfFieldToUpdate = textArea.value.replace(/[£$,.]/g, "");
    //         console.log(
    //           "Calling saveValueToCRM for text area with class crmValues"
    //         );

    //         console.log(`ID TO USE: ${recordId}`);
    //         console.log(`moduleToUpdate: ${moduleToUpdate}`);
    //         console.log(`fieldToUpdate: ${fieldToUpdate}`);
    //         console.log(`valueOfFieldToUpdate: ${valueOfFieldToUpdate}`);

    //         // Call saveValueToCRM for elements with class crmValues
    //         saveValueToCRM(
    //           moduleToUpdate,
    //           recordId,
    //           fieldToUpdate,
    //           valueOfFieldToUpdate
    //         );
    //       } else if (textArea.classList.contains("crmValuesComment")) {
    //         console.log(
    //           "Calling saveValueToCRM for text area with class crmValuesComment"
    //         );
    //         valueOfFieldToUpdate = textArea.value;
    //         // Call saveValueToCRM for elements with class crmValues
    //         saveValueToCRM(
    //           moduleToUpdate,
    //           recordId,
    //           fieldToUpdate,
    //           valueOfFieldToUpdate
    //         );
    //       } else {
    //         console.log("Calling saveObservationRating for other text areas");
    //         // Call saveObservationRating for all other elements
    //         const textAreaId = textArea.id; // Get the id of the textarea

    //         const observation = textArea.value; // Get the value of the field that needs to be updated

    //         // Debugging logs
    //         console.log(`TextArea ID: ${textAreaId}`);
    //         console.log(`Observation: ${observation}`);
    //         saveObservationRating(sOppId, textArea.name, observation);
    //       }

    //       //
    //     });
    //   });
    // }

    // function initializeTextAreas() {
    //   const textAreas = document.querySelectorAll(
    //     ".observationsComment, .linksComment, .comparablesComment, .shouldWeBuyAnswer, .dropDown, .crmValues, .crmValuesComment, .crmValuesFrontPage, .dropDownKeyFeatures"
    //   );

    //   textAreas.forEach((textArea) => {
    //     const initialObservation = textArea.value || "";
    //     textArea.value = initialObservation; // Set the initial value for textareas

    //     // Listen for changes to both textareas and dropdowns
    //     textArea.addEventListener("change", function () {
    //       // Extract module, recordId, fieldToUpdate and valueOfFieldToUpdate
    //       let recordId = textArea.getAttribute("idToUse");

    //       if (recordId === "sOppId") {
    //         recordId = sOppId;
    //       } else if (recordId === "offerRecId") {
    //         recordId = offerRecId;
    //       } else if (recordId === "propertyRecId") {
    //         recordId = propertyRecId;
    //       } else if (recordId === "productRecId") {
    //         recordId = productRecId;
    //       } else if (recordId === "surveyRecId") {
    //         recordId = surveyRecId;
    //       }

    //       const moduleToUpdate = textArea.getAttribute("moduleToUpdate");
    //       const fieldToUpdate = textArea.getAttribute("fieldToUpdate");
    //       let valueOfFieldToUpdate = textArea.value;

    //       // Handle textareas with the "crmValues" class
    //       if (textArea.classList.contains("crmValues")) {
    //         valueOfFieldToUpdate = textArea.value.replace(/[£$,.]/g, "");
    //         console.log(
    //           "Calling saveValueToCRM for text area with class crmValues"
    //         );
    //         console.log(`ID TO USE: ${recordId}`);
    //         console.log(`moduleToUpdate: ${moduleToUpdate}`);
    //         console.log(`fieldToUpdate: ${fieldToUpdate}`);
    //         console.log(`valueOfFieldToUpdate: ${valueOfFieldToUpdate}`);

    //         // Call saveValueToCRM for elements with class crmValues
    //         saveValueToCRM(
    //           moduleToUpdate,
    //           recordId,
    //           fieldToUpdate,
    //           valueOfFieldToUpdate
    //         );
    //       }
    //       // Handle textareas with the "crmValuesComment" class
    //       else if (textArea.classList.contains("crmValuesComment")) {
    //         console.log(
    //           "Calling saveValueToCRM for text area with class crmValuesComment"
    //         );
    //         saveValueToCRM(
    //           moduleToUpdate,
    //           recordId,
    //           fieldToUpdate,
    //           valueOfFieldToUpdate
    //         );
    //       }
    //       // Handle dropdowns with the "dropDownKeyFeatures" class
    //       else if (textArea.classList.contains("dropDownKeyFeatures")) {
    //         valueOfFieldToUpdate = textArea.value; // Get the selected value of the dropdown
    //         console.log(
    //           "Calling saveValueToCRM for dropdown with class dropDownKeyFeatures"
    //         );
    //         console.log(`Selected Value: ${valueOfFieldToUpdate}`);

    //         // Call saveValueToCRM for dropdowns
    //         saveValueToCRM(
    //           moduleToUpdate,
    //           recordId,
    //           fieldToUpdate,
    //           valueOfFieldToUpdate
    //         );
    //       }
    //       // Handle other textareas
    //       else {
    //         console.log("Calling saveObservationRating for other text areas");
    //         const textAreaId = textArea.id;
    //         const observation = textArea.value;
    //         console.log(`TextArea ID: ${textAreaId}`);
    //         console.log(`Observation: ${observation}`);
    //         saveObservationRating(sOppId, textArea.name, observation);
    //       }
    //     });
    //   });
    // }

    function initializeTextAreas() {
      const textAreas = document.querySelectorAll(
        ".observationsComment, .linksComment, .comparablesComment, .shouldWeBuyAnswer, .dropDown, .crmValues, .crmValuesComment, .crmValuesFrontPage, .dropDownKeyFeatures"
      );

      textAreas.forEach((textArea) => {
        const initialObservation = textArea.value || "";
        textArea.value = initialObservation; // Set the initial value for textareas

        // Listen for changes to both textareas and dropdowns
        textArea.addEventListener("change", function () {
          // Extract module, recordId, fieldToUpdate, and valueOfFieldToUpdate
          let recordId = textArea.getAttribute("idToUse");

          if (recordId === "sOppId") {
            recordId = localStorage.getItem("sOppId"); // Retrieve it from localStorage
          } else if (recordId === "offerRecId") {
            recordId = localStorage.getItem("offerRecId"); // Retrieve it from localStorage
          } else if (recordId === "propertyRecId") {
            recordId = localStorage.getItem("propertyRecId"); // Retrieve it from localStorage
          } else if (recordId === "productRecId") {
            recordId = localStorage.getItem("productRecId"); // Retrieve it from localStorage
          } else if (recordId === "surveyRecId") {
            recordId = localStorage.getItem("surveyRecId"); // Retrieve it from localStorage
          }

          const moduleToUpdate = textArea.getAttribute("moduleToUpdate");
          const fieldToUpdate = textArea.getAttribute("fieldToUpdate");
          let valueOfFieldToUpdate = textArea.value;

          // Handle textareas with the "crmValues" class
          if (textArea.classList.contains("crmValues")) {
            valueOfFieldToUpdate = textArea.value.replace(/[£$,.]/g, "");
            console.log(
              "Calling saveValueToCRM for text area with class crmValues"
            );
            console.log(`ID TO USE: ${recordId}`);
            console.log(`moduleToUpdate: ${moduleToUpdate}`);
            console.log(`fieldToUpdate: ${fieldToUpdate}`);
            console.log(`valueOfFieldToUpdate: ${valueOfFieldToUpdate}`);

            // Call saveValueToCRM for elements with class crmValues
            saveValueToCRM(
              moduleToUpdate,
              recordId,
              fieldToUpdate,
              valueOfFieldToUpdate
            );
          } // Handle textareas with the "crmValues" class
          else if (textArea.classList.contains("crmValuesFrontPage")) {
            valueOfFieldToUpdate = textArea.value.replace(/[£$,.]/g, "");
            console.log(
              "Calling saveValueToCRM for text area with class crmValuesFrontPage"
            );

            // Call saveValueToCRM for elements with class crmValues
            saveValueToCRM(
              moduleToUpdate,
              recordId,
              fieldToUpdate,
              valueOfFieldToUpdate
            );
          }
          // Handle textareas with the "crmValuesComment" class
          else if (textArea.classList.contains("crmValuesComment")) {
            console.log(
              "Calling saveValueToCRM for text area with class crmValuesComment"
            );

            saveValueToCRM(
              moduleToUpdate,
              recordId,
              fieldToUpdate,
              valueOfFieldToUpdate
            );
          }
          // Handle dropdowns with the "dropDownKeyFeatures" class
          else if (textArea.classList.contains("dropDownKeyFeatures")) {
            valueOfFieldToUpdate = textArea.value; // Get the selected value of the dropdown

            // Special case for "parking" field
            if (fieldToUpdate === "parking") {
              valueOfFieldToUpdate =
                valueOfFieldToUpdate.toLowerCase() === "yes" ? true : false;
              console.log(
                "Field 'parking' detected, setting value to:",
                valueOfFieldToUpdate
              );
            }

            console.log(
              "Calling saveValueToCRM for dropdown with class dropDownKeyFeatures"
            );
            console.log(`Selected Value: ${valueOfFieldToUpdate}`);

            // Call saveValueToCRM for dropdowns
            saveValueToCRM(
              moduleToUpdate,
              recordId,
              fieldToUpdate,
              valueOfFieldToUpdate
            );
          }
          // Handle other textareas
          else {
            console.log("Calling saveObservationRating for other text areas");
            const textAreaId = textArea.id;
            const observation = textArea.value;
            console.log(`TextArea ID: ${textAreaId}`);
            console.log(`Observation: ${observation}`);
            saveObservationRating(sOppId, textArea.name, observation);
          }
        });
      });
    }

    // Initialize text areas
    initializeTextAreas();
  }, 10000); // 10 seconds
});
