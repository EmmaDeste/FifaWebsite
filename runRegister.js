
/* Sources
https://ricardometring.com/getting-the-value-of-a-select-in-javascript
https://linuxhint.com/take-input-radio-buttons-javascript/
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
https://developer.mozilla.org/fr/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage
https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor
https://web.dev/indexeddb/
*/

	let my_db; // Please note that our database will be named EmmaDB and store (=table) will be named 'people'
	
	let lastUsed = "";

	
	
	function getName() {
		return(document.getElementById('name').value);
	}
	
	function getSurname() {
		return(document.getElementById('surname').value);
	}
	
	function getAge() {
		return(document.getElementById('age').value);
	}
	
	function getGender() {
		var select = document.getElementById('gender');
		var text = select.options[select.selectedIndex].text;
		return(text);
	}
	
	function getEducation() {
		var select = document.getElementById('education');
		var text = select.options[select.selectedIndex].text;
		return(text);
	}
	
	function getCitizenship() {
		var select = document.getElementById('citizenship');
		var text = select.options[select.selectedIndex].text;
		return(text);
	}
	
	function getCountry() {
		var select = document.getElementById('country');
		var text = select.options[select.selectedIndex].text;
		return(text);
	}
	
	/* NEW BUTTONS */
	
	function cancelForm(){
		document.getElementById('name').value = "";
		document.getElementById('surname').value = "";
		document.getElementById('age').value = "";
		
		var dropDown = document.getElementById("gender");
		dropDown.selectedIndex = 0;
		
		var dropDown = document.getElementById("education");
		dropDown.selectedIndex = 0;
		
		var dropDown = document.getElementById("citizenship");
		dropDown.selectedIndex = 0;
		
		var dropDown = document.getElementById("country");
		dropDown.selectedIndex = 0;
		
		lastUsed = ""; //once the form is cancelled, there is no last-clicked input anymore
	} 
	
	
	
	
	function setLastUsed(key) {
		console.log(key);
		lastUsed = key;
	}
		


	function deleteLine() {
		if(lastUsed != ""){ //can't delete an empty object
			const os = my_db.transaction(['people'], "readwrite").objectStore('people');
			const getAllKeys = os.getAllKeys();
			getAllKeys.onsuccess = (event)=>{
					console.log(getAllKeys.result);
					ga = getAllKeys.result;
					
					if(ga.length > 0){
						res = ga[ga.length-1];
						console.log(res);
					
						os.delete(res);
					}	
			}
			
			request.onsuccess = (event)=>{
					console.log("Supporter removed from the list");
			}
			
			request.onerror = (event)=>{
					console.log("Supporter NOT removed");
			}
			
		}
				
	}

	/* END */
	
	function verifyAndSubmit(){
		if (getName() != "" && getSurname() != "" && getAge() != "") { //verify that a name, surname and age is well filled
			console.log("No empty boxes");
			submitForm();
		}
		
		else{
			console.log("Info missing");
			alert("Info missing");
		}
	}
	
	
	function submitForm() {
		const transaction = my_db.transaction(["people"], "readwrite"); // read and write on people tab(=onglet)
		
		transaction.oncomplete = (event) => {
  			console.log("Transaction completed: database modification finished.");
  			lastUsed = event.target.result;
  			console.log(event);
  			console.log(event.target);
  			console.log(lastUsed);
		};
		
		transaction.onerror = (event) => {
 			console.log("Insert in store error");
		};
		
		let newItem = { name: getName(), surname: getSurname(), age: getAge(), // creation and definiton of the object of the new line ro write in the onglet, dictionary format
						gender: getGender(), education: getEducation(), 
						citizenship: getCitizenship(), country: getCountry() };
		
		let action = transaction.objectStore('people'); // why defining again on which onglet we act? To specify on which onglet acting
		var request = action.add(newItem);

		request.onsuccess = function() {
			console.log('request.onsuccess');
			cancelForm();
		};
		
		
	}

	function listAll() {

		console.log('List all requested');

		const text_area = document.getElementById('allPeopleArea');
		text_area.value ="People are: \n";
		var nb_people = 0;

		const transaction = my_db.transaction(['people'], "readonly"); // readonly, meaning no modifications on people tab(=onglet), so that it proccesses multiple transactions simultenaously
		const objectStore = transaction.objectStore('people'); // people is the name of the objectStore (equivalent SQL of a table), 1 line = 1 object

		objectStore.openCursor().onsuccess = (event) => { // sequence reading in the database, onsuccess to NOT perform wrong actions
   			const cursor = event.target.result; // result of the event
   			
    		if (cursor) { // know if the cursor is still on something or reach the database's end
				/* gender = cursor.value.gender;
				if (!gender) // must be a string and not undefined to use the pad function hereafter
					gender = "unknown"; */
				text_area.value += cursor.value.name + " - ";
				text_area.value += cursor.value.surname + " - ";
				text_area.value += cursor.value.age + " - ";
				text_area.value += cursor.value.gender + " - ";
				// text_area.value += gender.padEnd(6);
				text_area.value += cursor.value.education + " - ";
				text_area.value += cursor.value.citizenship + " - ";
				text_area.value += cursor.value.country + "\n";
				nb_people++;
				cursor.continue(); // end of the line reading, need to recall the function to read the following line (corresponding to the next person, next record)
	     		
			} 
			else {
				text_area.value += nb_people + " supporters registered.";
				console.log('Everybody has been shown.');
			}
	  	};
	}
	
	
	// Executes only once when the page is launched

	const request = indexedDB.open("EmmaDBase", 1); // version 1 of the database //ICE: change database name
	
	request.onupgradeneeded = (event) => { // database's treatment if the bdd doesn't exists already, meaning creation because no update of the HTML form (example: speaking language question)
		const db = event.target.result;
		// Only use when the peole store (=table) does not exist or has an older version
		// Create an objectStore for this database
		const objectStore = db.createObjectStore("people", 
												{ keyPath: 'clef', autoIncrement: true });
		console.log("people created using idb");
	};
	
	request.onerror = (event) => { // if error happens
		console.error("Why didn't you allow my web app to use IndexedDB?");
	};

	request.onsuccess = (event) => { // if the request works fine
		my_db = event.target.result; // result of the database's opening -> object enabling to dialog with the database, open can be a long proccess
		console.log("Connected to people database");
	};


	window.addEventListener("load", () => {
		console.log("Page is fully loaded!");
	});
