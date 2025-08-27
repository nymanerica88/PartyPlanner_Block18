//This is a completely notated copy of the answer key with an
//explanation of the code line by line to aid in understanding.
//This js document is not connected to anything, nor rendered in the
//homework assignment
// Thanks
// - Erica
//====================================================================

// === Constants ===

//saves the base API in a variable named BASE
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
//empty string placeholder for the cohort name
const COHORT = ""; // Make sure to change this!
//joins the BASE URL with the COHORT string to create a full API
const API = BASE + COHORT;

// === State ===

//creates a blank array for each of the following
//parties, rsvps, guests
//selectedParty is the party that was selected by the user
let parties = [];
let selectedParty;
let rsvps = [];
let guests = [];

/** Updates state with all parties from the API */

//defines an asynchronous function named get Parties to fetch all parties
async function getParties() {
  //begins the try/catch block for error handling
  try {
    //variable, fetches all parties from the api and awaits the results
    const response = await fetch(API + "/events");
    //variable, turns the response into a JS Obj
    const result = await response.json();
    //updates the parties array with the results from the API
    parties = result.data;
    //refreshes the screen with the updated data
    render();
    //catch error
  } catch (e) {
    //console log the error, if there is an error caught
    console.error(e);
  }
}

/** Updates state with a single party from the API */

//function to fetch one specific party by id number
async function getParty(id) {
  //begins the try/catch block for error handling
  try {
    //variable, fetches the API at the event id for a single party
    const response = await fetch(API + "/events/" + id);
    //variable, turns the response into a JSON Obj
    const result = await response.json();
    //updates the selectedParty to include the result data
    selectedParty = result.data;
    //refreshes the page to include the update
    render();
    //catch error
  } catch (e) {
    //console log the error if caught
    console.error(e);
  }
}

/** Updates state with all RSVPs from the API */

//asynchronous function that loads RSVPs
async function getRsvps() {
  //beginning of the try/catch block
  try {
    //variable, fetches the RSVPs and awaits the response
    const response = await fetch(API + "/rsvps");
    //variable, turns the response into a JSON Obh
    const result = await response.json();
    //updates the rsvp with the results
    rsvps = result.data;
    //refreshes the page to include the update
    render();
    //catches errors
  } catch (e) {
    //console log the error if caught
    console.error(e);
  }
}

/** Updates state with all guests from the API */

//asynchronous function that retrieves a list of guest names
async function getGuests() {
  //start of the try/catch block
  try {
    //variable, fetches the guest list and awaits the response
    const response = await fetch(API + "/guests");
    //variable, converts the response to a JSON Obj
    const result = await response.json();
    //updates the guests array to include the repsonse data
    guests = result.data;
    //refreshes the page to capture the data update
    render();
    //catch errors
  } catch (e) {
    //console log errors if caught
    console.error(e);
  }
}

// === Components ===

/** Party name that shows more details about the party when clicked */

//function PartyListItem that creates a list item for the party
function PartyListItem(party) {
  //creates a new list item
  const $li = document.createElement("li");

  //if the party id equals the selected party id
  //the questioin mark indicates that we should only be checked if
  //the selected party exists
  if (party.id === selectedParty?.id) {
    //add the selected item to the class list
    $li.classList.add("selected");
  }

  //place a link inside of the list item that shows the party's name
  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
  `;
  //when the list item is clicked, fetch the details from getParty(party it)
  $li.addEventListener("click", () => getParty(party.id));
  //return the finished list item
  return $li;
}

/** A list of names of all parties */

//function that creates an unordered list of the parties
function PartyList() {
  // creates an unordered list
  const $ul = document.createElement("ul");
  //adds the parties to the unordered list
  $ul.classList.add("parties");

  //create a list item using each of the list items in PartyListItems
  const $parties = parties.map(PartyListItem);
  //replaces the unordered list items with the contents of the mapped
  //list items
  $ul.replaceChildren(...$parties);

  //returns the unordered list
  return $ul;
}

/** Detailed information about the selected party */

//function that fetches details about the selected party
function SelectedParty() {
  //if no party has been picked yet
  if (!selectedParty) {
    //create a pTag
    const $p = document.createElement("p");
    //set the contents of the pTag to "Please select a party to learn more"
    $p.textContent = "Please select a party to learn more.";
    //return the contents of the pTag
    return $p;
  }

  //if the party has been selected, create a section
  const $party = document.createElement("section");
  //set the contents of the section equal to
  ////Selected Party Name and ID
  ///Selected party date (reduced to 10 characters)
  ////Selected party address
  ////Selected party description
  ////Create a placeholder for the guest list
  $party.innerHTML = `
    <h3>${selectedParty.name} #${selectedParty.id}</h3>
    <time datetime="${selectedParty.date}">
      ${selectedParty.date.slice(0, 10)}
    </time>
    <address>${selectedParty.location}</address>
    <p>${selectedParty.description}</p>
    <GuestList></GuestList>
  `;

  //replace the GuestList placeholder with the actual list of guests
  $party.querySelector("GuestList").replaceWith(GuestList());

  //refresh the page to include the updated party section
  return $party;
}

/** List of guests attending the selected party */

//function GuestList creates the guest list for the party
function GuestList() {
  //creates an unordered list
  const $ul = document.createElement("ul");
  //variable, filters the guests down to the guests that RSVPed for that event
  const guestsAtParty = guests.filter((guest) =>
    //check the RSVPs and find out
    rsvps.find(
      //do the RSVP guestID and the guest ID math?
      //do the RSVP ID and the Event ID match?
      (rsvp) => rsvp.guestId === guest.id && rsvp.eventId === selectedParty.id
    )
  );

  // Simple components can also be created anonymously:

  //map each guest on the filtered list to a list item
  const $guests = guestsAtParty.map((guest) => {
    //create the list item
    const $guest = document.createElement("li");
    //set the list item content to the guests name
    $guest.textContent = guest.name;
    //return the list of guests
    return $guest;
  });
  //add the returned guest to the list items on the unordered list
  $ul.replaceChildren(...$guests);

  //return the unordered list
  return $ul;
}

// === Render ===

function render() {
  //select the app element
  const $app = document.querySelector("#app");
  //sets the hcontents of the HTML Element to two
  // headers, the party list and the selected party
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <SelectedParty></SelectedParty>
      </section>
    </main>
  `;

  //replace the Party List with the actual party list
  $app.querySelector("PartyList").replaceWith(PartyList());
  //replace the selected party with the actual selected party
  $app.querySelector("SelectedParty").replaceWith(SelectedParty());
}

//asynchronous function to initialize everything
async function init() {
  //fetch all parties and await the response
  await getParties();
  //fetch all RSVPs and await the response
  await getRsvps();
  //fetch all guests and await the response
  await getGuests();
  //update the UI to show the updates
  render();
}

//calls the initialization function
init();
