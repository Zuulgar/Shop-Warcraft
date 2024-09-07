function getRandomEntries(radioValue, maxValue, minValue) {
/*   console.log("radioValuefunc:", radioValue);
  console.log("minValuefunc:", minValue);
  console.log("maxValuefunc:", maxValue);
 */
  if (!radioValue || !minValue || !maxValue) {
    throw new Error("Missing required parameters");
  }

  //Get the JSON data from the JSON file

   fetch("./shop.json") // Replace with the correct path to your JSON file
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
      // Save the JSON data into the variable
      jsonData = data;
      //console.log(jsonData); // Log the JSON data to the console or use it as needed
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });
  const randomCount = Math.floor(Math.random() * (25 - 5 + 1)) + 5;

  const filteredData = jsonData.filter((entry) => {
    if (radioValue === "ALL") {
      return entry.VALORE >= minValue && entry.VALORE <= maxValue;
    } else {
      return (
        entry.SHOP === radioValue &&
        entry.VALORE >= minValue &&
        entry.VALORE <= maxValue
      );
    }
  });
  
  //randomize the data
  const randomizedData = filteredData.sort(() => Math.random() - 0.5);

  //select the first randomCount elements
  const selectedEntries = randomizedData.slice(0, randomCount);

  //sort the selected entries by VALORE
  const sortedData = selectedEntries.slice(); // create a copy of selectedEntries

  for (let i = 0; i < sortedData.length - 1; i++) {
    for (let j = 0; j < sortedData.length - i - 1; j++) {
      if (sortedData[j].VALORE > sortedData[j + 1].VALORE) {
        // swap elements
        const temp = sortedData[j];
        sortedData[j] = sortedData[j + 1];
        sortedData[j + 1] = temp;
      }
    }
  }

  //console.log("selectedEntries:", sortedData);

  return sortedData;
}
