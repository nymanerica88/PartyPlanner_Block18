//creates a list of all of the parties
let parties = [];
//sets the variable selectedParty to a null value
//so that we can reassign it later once the logic has been incorporated
let selectedParty = null;

//function named App that creates the application
//application consists of a div containig the Party List
//and the Party Details
function App() {
  //variable named div that creates a div element
  const div = document.createElement("div");
  //appends the PartyList to the div
  div.appendChild(PartyList());
  //appends the party details to the div
  div.appendChild(PartyDetails());
  //returns the div
  return div;
}

//creates a function that returns the names of the different parties
//connects the party name with the ID Number
function getAllParties() {
  return [
    { id: 1, name: "Purple Pixies" },
    { id: 2, name: "Nineties Nostalgia" },
    { id: 3, name: "Rouge Ranch Rodeo" },
    { id: 4, name: "Popcorn Poppers" },
    { id: 5, name: "Frozen & Free Fridays" },
    { id: 6, name: "Yellow Brick Bows" },
  ];
}

//creates a function named getPartyByID that returns
//the details of each party, using the ID Num as a parameter
function getPartyById(id) {
  const details = {
    1: {
      id: 1,
      name: "Purple Pixies",
      date: "08-30-2025",
      description: "Purple Glitter & Fairy Themed Party",
      location: "Chicago, IL",
    },
    2: {
      id: 2,
      name: "Nineties Nostalgia",
      date: "10-13-2025",
      description: "90s Themed Dance Party",
      location: "Detroit, MI",
    },
    3: {
      id: 3,
      name: "Rouge Ranch Rodeo",
      date: "12-21-2025",
      description: "Ranch Themed Party with Horseback Riding Available",
      location: "Austin, TX",
    },
    4: {
      id: 4,
      name: "Popcorn Poppers",
      date: "1-24-2026",
      description: "Movie Themed House Party",
      location: "Valparaiso, IN",
    },
    5: {
      id: 5,
      name: "Frozen & Free Fridays",
      date: "02-06-2026 & 2-13-2026",
      description: "Slurpee Parties",
      location: "Denver, CO",
    },
    6: {
      id: 6,
      name: "Yellow Brick Bows",
      date: "12-21-2025",
      description: "Cosplay Party for the Wizard of Oz",
      location: "Austin, TX",
    },
  };
  //returns the party details using the id
  return details[id];
}

//creates space on the page to show the list of parties
//function named PartyList
function PartyList() {
  //creates a variable called div that creates the div element
  const div = document.createElement("div");
  //creates a variable called title that creates a header element
  const title = document.createElement("h2");
  //sets the content of the header to Upcoming Parties
  title.textContent = "Upcoming Parties";
  //appends the title to the div
  div.appendChild(title);

  //creates a variable called ul that creates the
  //unordered list element
  const ul = document.createElement("ul");

  //loop that goes through each party
  parties.forEach(function (party) {
    //creates a variable named li that creates a list item element
    //for each party
    const li = document.createElement("li");
    //creates a variable named btn that creates a button element
    //for each party
    const btn = document.createElement("button");
    //sets the button text content equal to the party name
    btn.textContent = party.name;

    // adds the functionality of the button [event listeners]
    btn.addEventListener("click", function () {
      //sets selectedParty equal to getPartyById function with
      //party.id as a parameter
      selectedParty = getPartyById(party.id);
      //renders the results (makes the results visible on the UI)
      render();
    });

    //adds the button to the list item
    li.appendChild(btn);
    //adds the list item to the unordered list
    ul.appendChild(li);
  });

  //adds the unordered list to the div
  div.appendChild(ul);
  //returns the entire div
  return div;
}

//creates a function named PartyDetails that shows all
//of the details for the selected party
function PartyDetails() {
  //creates a variable named div that creates a div element
  const div = document.createElement("div");
  //creates a variable named title that creates a header element
  const title = document.createElement("h2");
  //sets the text of the header to "Details"
  title.textContent = "Details";
  //appends the title to the div
  div.appendChild(title);

  //if there isn't a value for the selectedParty
  if (selectedParty === null) {
    //creates a variable called msg that creates a pTag element
    const msg = document.createElement("p");
    //sets the message content equal to "Please select a party"
    msg.textContent = "Please select a party.";
    //adds the message to the div
    div.appendChild(msg);
    //otherwise
  } else {
    //add to the information that is already
    //inside the HTML content of the div (+= means add
    //it to what is already there)

    //Name (bold text): Selected Party Event Name
    //ID (bold text): Selected Party ID
    //Date (bold text): Selected Party Date
    //Description (bold description): Selected Party Description
    //Location (bold text): Selected Party Location
    div.innerHTML += `
      <p><b>Name:</b> <br> ${selectedParty.name}</p>
      <p><b>ID:</b> <br> ${selectedParty.id}</p>
      <p><b>Date:</b> <br> ${selectedParty.date}</p>
      <p><b>Description:</b> <br> ${selectedParty.description}</p>
      <p><b>Location:</b> <br> ${selectedParty.location}</p>
    `;
  }
  //returns the div
  return div;
}

//creates a variable named root that creates a div
const root = document.createElement("div");
//appends the root to the document of the body
document.body.appendChild(root);

//function named render that makes the root blank
//and then adds the app to the root
function render() {
  //sets the inner HTML of the root blank
  root.innerHTML = "";
  //adds the app to the root
  root.appendChild(App());
}

//this section is to start the app
//sets parties equal to getAllParties
parties = getAllParties();
//makes the results visible on the UI
render();
