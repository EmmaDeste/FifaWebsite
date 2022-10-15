
function fillDetails(){
	
	window.location.href = "details5.html";
}


/* DEFINE SOME USERS AND VERIFY THEIR IDENTITIES
var objPeople = [
	{
		username: "emma",
		password: "emma"
	},
	{
		username: "olivier",
		password: "olivier"
	},
	{
		username: "valerie",
		password: "valerie"
	}
]


function getInfo(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	
	for(i=0; i<objPeople.length; i++){
		if(username == objPeople[i].username && password == objPeople[i].password){
				alert(username + " you are successfully log in");
				return;
			}
			
			else{
				alert("Incorrect username or password");
			}
		}
}
*/


/* SIMPLE TEST OF USER NAME AND PASSWORD COMPATIBILITY
const loginForm = document.getElementById("loginForm");

const loginButton = document.getElementById("loginFormSubmit");

loginButton.addEventListener("click", (e) => {
	e.preventDefault();
	const username = loginForm.username.value;
	const password = loginForm.password.value;

	if (username === "emma" && password === "happy") {
		alert("You have successfully logged in");
		window.location = "login4.html";
	} 
	else {
		alert("Problem with your login");
	}
})

//Dislay a message in the console when the page is fully loaded
window.addEventListener("load", () => {
	console.log("Page is fully loaded");
};
 
*/

