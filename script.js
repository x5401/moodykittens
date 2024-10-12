
  let kittens = []
  let oInput = document.querySelector("input");
  let oForm = document.querySelector("form");
  let oKittenList = document.querySelector("#kittens");
  let oClearKittensBox = document.querySelector(".clear-all-box");
  /**
   * Called when submitting the new Kitten Form
   * This method will pull data from the form
   * use the provided function to give the data an id
   * then add that data to the kittens list.
   * Then reset the form
   */
  function addKitten(event) {
    event.preventDefault();
    let name = oInput.value;
    let id = generateId();
    if(!name){
      alert("Enter a kitten's name");
      return;
    }
    let index = kittens.findIndex(kitten => kitten.name.toUpperCase() === name.toUpperCase());
    if(index !== -1){
      alert(`${name.toUpperCase()} already exists. Enter a different name.`);
    }else{
      let kitten = {
        id: id,
        name: name,
        mood: "tolerant",
        affection: 5
      };
      kittens.push(kitten);
      saveKittens();
      oClearKittensBox.style.display = "block";
    }
    oForm.reset();
  }

  /**
   * Converts the kittens array to a JSON string then
   * Saves the string to localstorage at the key kittens
   */
  function saveKittens() {
    let str = JSON.stringify(kittens);
    window.localStorage.setItem("kittens", str);
    drawKittens();
  }

  /**
   * Attempts to retrieve the kittens string from localstorage
   * then parses the JSON string into an array. Finally sets
   * the kittens array to the retrieved array
   */
  function loadKittens() {
    let retrievedStr = window.localStorage.getItem("kittens");
    let retrievedKittens = JSON.parse(retrievedStr);
    if(retrievedKittens){
      kittens = retrievedKittens;
    }
  }

  /**
   * Draw all of the kittens to the kittens element
   */
  function drawKittens() {
    let kittenTemplate = "";
    kittens.forEach(kitten => {
      kittenTemplate += `
        <div class="kitten-card mt-1 mb-1">
          <h3 class="mt-1 mb-1">${kitten.name}</h3>
          <div class="kitten ${kitten.mood}">
            <img src="moody-logo.png" class="card-img">
          </div>
          <p>${kitten.name} is ${kitten.mood}</p>
          <div>
            <button class="m-2" onclick="pet('${kitten.id}')">pet</button>
            <button class="m-2" onclick="catnip('${kitten.id}')">catnip</button>
            <button class="m-2" onclick="treats('${kitten.id}')">treats</button>
          </div>
          <button class="remove-btn" onclick="removeKitten('${kitten.id}')">delete</button>
        </div>
      `;
    });
    oKittenList.innerHTML = kittenTemplate;
    if(kittens.length > 0){
      oClearKittensBox.style.display = "block";
    }else{
      oClearKittensBox.style.display = "none";
    }
  }


  /**
   * Find the kitten in the array by its id
   * @param {string} id
   * @return {Kitten}
   */
  function findKittenById(id) {
    let index = kittens.findIndex(kitten => kitten.id === id);
    if(index === -1){
      throw new Error("invalid id");
    }
    return kittens[index];
  }


  /**
   * Find the kitten in the array of kittens
   * Generate a random Number
   * if the number is greater than .5
   * increase the kittens affection
   * otherwise decrease the affection
   * @param {string} id
   */
  function pet(id) {
    let kitten = findKittenById(id);
    let num = Math.random();
    if(num > 0.5){
      kitten.affection += 1;
    }else{
      kitten.affection -= 1;
    }
    setKittenMood(kitten);
    saveKittens();
  }

  /**
   * Find the kitten in the array of kittens
   * Set the kitten's mood to tolerant
   * Set the kitten's affection to 5
   * @param {string} id
   */
  function catnip(id) {
    let kitten = findKittenById(id);
    kitten.mood = "tolerant";
    kitten.affection = 5;
    setKittenMood(kitten);
    saveKittens();
  }

  function treats(id){
    let kitten = findKittenById(id);
    kitten.mood = "happy";
    kitten.affection = 10;
    setKittenMood(kitten);
    saveKittens();
  }
  /**
   * Sets the kittens mood based on its affection
   * @param {Kitten} kitten
   */
  function setKittenMood(kitten) {
    if(kitten.affection >= 10){
      kitten.mood = "happy";
    }else if(kitten.affection >= 5){
      kitten.mood = "tolerant";
    }else if(kitten.affection >= 0){
      kitten.mood = "angry";
    }else{
      kitten.mood = "gone";
    }
  }

  /**
   * Removes all of the kittens from the array
   * remember to save this change
   */
  function clearKittens(){
    kittens = [];
    saveKittens();
    oClearKittensBox.style.display = "none";
  }

  function removeKitten(kittenId){
    let index = kittens.findIndex(kitten => kitten.id === kittenId);
    if(index === -1){
      throw new Error("invalid id");
    }
    kittens.splice(index, 1);
    if(kittens.length === 0){
      oClearKittensBox.style.display = "none";
    }
    saveKittens();
  }

  /**
   * Removes the welcome content and should probably draw the
   * list of kittens to the page. Good Luck
   */
  function getStarted() {
    document.getElementById("welcome").remove();
    console.log('Good Luck, Take it away')
  }


  // --------------------------------------------- No Changes below this line are needed

  /**
   * Defines the Properties of a Kitten
   * @typedef {{id:sting, name: string, mood: string, affection: number}} Kitten
   */


  /**
   * Used to generate a random string id for mocked
   * database generated Id
   * @returns {string}
   */
  function generateId() {
    return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
  }

  loadKittens();
  drawKittens();
