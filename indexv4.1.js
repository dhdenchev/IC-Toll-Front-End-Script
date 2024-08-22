//Functionality to fill up stars colours, depending on average rating.

function fillStars(wrapperId, rating) {
  const starsWrapper = document.getElementById(wrapperId);

  // Ensure the stars wrapper exists
  if (!starsWrapper) {
    console.error(`Element with ID '${wrapperId}' not found.`);
    return;
  }

  const stars = starsWrapper.querySelectorAll(".star-module-header");

  stars.forEach((star, index) => {
    if (index < Math.floor(rating)) {
      star.style.color = "#00874f"; // Fully filled star
      star.style.background = "none"; // Clear any partial backgrounds
    } else if (index === Math.floor(rating)) {
      const decimalPart = rating - Math.floor(rating);
      star.style.background = `linear-gradient(to right, #00874f ${
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

const saveObservationRating = (sOppId, fieldToUpdate, valueOfFieldToUpdate) => {
  // Ensure valueOfFieldToUpdate is assigned correctly, even if it's an empty string
  valueOfFieldToUpdate =
    valueOfFieldToUpdate === undefined ? "" : valueOfFieldToUpdate;
  const apiUrl = "http://localhost:3000/api/updateRecordDetails";

  fetch(apiUrl, {
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
//Function to toggle classes of the SHOULD WE BUY decision based on API response
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
    pairs,
    updateSpanColorsFlag
  ) {
    var elements = document.querySelectorAll(classSelector);
    //Turned this functionality off as it conflicts with the filling up of stars
    // Function to update the colors of spans inside the elements
    // function updateSpanColors() {
    //   elements.forEach(function (item) {
    //     var spans = item.querySelectorAll("span");
    //     spans.forEach(function (span) {
    //       if (item.classList.contains(toggleClass)) {
    //         span.style.color = "white";
    //       } else {
    //         span.style.color = ""; // Reset to default color
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
        if (updateSpanColorsFlag) {
          updateSpanColors();
        }

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

    if (updateSpanColorsFlag) {
      updateSpanColors();
    }
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

document.addEventListener("DOMContentLoaded", function () {
  if (sOppId) {
    fetch("http://localhost:3000/api/getRecordDetails", {
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
            // Update the HTML elements with formatted values
            document.getElementById("propertyAddress").textContent =
              resultObj.street || "-";
            document.getElementById("propertyPostcode").textContent =
              resultObj.propertyPostcode || "-";
            document.getElementById("propertyType").textContent =
              resultObj.propertyType || "-";
            document.getElementById("propertyStyle").textContent =
              resultObj.propertyStyle || "-";
            document.getElementById("propertyBedrooms").textContent =
              resultObj.bedrooms + " Bedrooms" || "-";
            document.getElementById("propertyBathrooms").textContent =
              resultObj.bathrooms + " Bathrooms" || "-";
            document.getElementById("propertyFloorArea").textContent =
              resultObj.floorArea + " ㎡" || "-";
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
              resultObj.gardenArea + " ㎡" || "-";
            document.getElementById("propertyParking").textContent =
              resultObj.parking || "-";
            document.getElementById("propertyTenure").textContent =
              resultObj.tenure || "-";
            document.getElementById("outraOfferRange").textContent =
              formatOutraOfferRange(resultObj.OutraOfferRange) || "-";
            document.getElementById("outraValuation").textContent =
              "£" + formatNumber(resultObj.outraValuation) || "-";
            document.getElementById("indicativeOffer").textContent =
              "£" + formatNumber(resultObj.indicativeOffer) || "-";
            document.getElementById("uwValuation").textContent =
              "£" + formatNumber(resultObj.uwValuation) || "-";
            document.getElementById("uwOffer").textContent =
              "£" + formatNumber(resultObj.uwOffer) || "-";
            document.getElementById("180DayValuation").textContent =
              "£" + formatNumber(resultObj["180DayValuation"]) || "-";

            //SHOULD WE BUY MODULE------------------------------------------------------------------------------------
            document.getElementById("outraOfferRangeShouldWeBuy").textContent =
              formatOutraOfferRange(resultObj.OutraOfferRange) || "-";
            //
            document.getElementById("outraValuationShouldWeBuy").textContent =
              "£" + formatNumber(resultObj.outraValuation) || "-";
            //
            document.getElementById("180DayValuationShouldWeBuy").textContent =
              "£" + formatNumber(resultObj["180DayValuation"]) || "-";
            //
            document.getElementById("uwValuationShouldWeBuy").textContent =
              "£" + formatNumber(resultObj.uwValuation) || "-";
            //
            document.getElementById("uwOfferShouldWeBuy").textContent =
              "£" + formatNumber(resultObj.uwOffer) || "-";
            //
            //
            document.getElementById("indicativeOfferShouldWeBuy").textContent =
              "£" + formatNumber(resultObj.indicativeOffer) || "-";
            //
            //Update Should we buy decision

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
            document.getElementById(
              "UW_Observation_Should_We_Buy_Profit_Share_Percentage"
            ).textContent =
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_Profit_Share_Percentage || "";
            //
            //Profit Share Threshold
            document.getElementById(
              "UW_Observation_Should_We_Buy_Profit_Share_Threshold"
            ).textContent =
              resultObj.creatorRecord[0]
                .UW_Observation_Should_We_Buy_Profit_Share_Threshold || "";
            //
            //------------------------------------------------------------------------------------
            //Comments and Stars ratings data
            //CONDITION -------------------------------------------------------------------------------------
            //General Answered Questions/ Questions Count & Overall Rating

            document.getElementById("conditionAnsweredQuestions").textContent =
              resultObj.creatorRecord[0].conditionModuleRating
                .conditionAnsweredQuestions || "";
            document.getElementById("conditionTotalQuestions").textContent =
              resultObj.creatorRecord[0].conditionModuleRating
                .conditionTotalQuestions || "";

            //FILL AVERAGE STARS RATING
            if (
              resultObj.creatorRecord[0].conditionModuleRating
                .conditionAverageRating
            ) {
              fillStars(
                "conditionStarsRating",
                resultObj.creatorRecord[0].conditionModuleRating
                  .conditionAverageRating
              );
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
            //END OF MARKET DEPTH -------------------------------------------------------------------------------------
            //LOCATION  -------------------------------------------------------------------------------------
            //END OF LOCATION -------------------------------------------------------------------------------------
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
            //
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
            //
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
            //END OF COMPARABLES -------------------------------------------------------------------------------------
            //ESTATE AGENT RECOMMENDATION -------------------------------------------------------------------------------------
            //END OF ESTATE AGENT RECOMMENDATION -------------------------------------------------------------------------------------
            //------------------------------------------------------------------------------------------------------------
            // General fields from Creator DB
            //Comments
            document.getElementById("Comments").value =
              resultObj.creatorRecord[0].Comments || "";
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
    function initializeTextAreas() {
      const textAreas = document.querySelectorAll(
        ".observationsComment, .linksComment, .comparablesComment, .shouldWeBuyAnswer"
      );
      textAreas.forEach((textArea) => {
        const initialObservation = textArea.value || "";
        textArea.value = initialObservation; // Set the initial value
        textArea.addEventListener("change", function () {
          const observation = textArea.value; // Remove the trim() to allow empty strings
          const textAreaId = textArea.id; // Get the id of the textarea
          const textAreaName = textArea.name; // Get the name of the textarea
          console.log(`Observation: ${observation}`);
          console.log(`TextArea ID: ${textAreaId}`);
          console.log(`TextArea Name: ${textAreaName}`);
          console.log(`TextArea Value: ${textArea.value}`);
          // Save the rating value to the server using an API
          saveObservationRating(sOppId, textAreaName, observation);
        });
      });
    }

    // Initialize text areas
    initializeTextAreas();
  }, 10000); // 10 seconds
});
