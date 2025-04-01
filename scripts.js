var retrievedData; 		
document.getElementById('loadData').addEventListener('click', function() {
	console.log('Loading data from API...');
	// Fetch data from a public API
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
				retrievedData = data;
				this.classList.remove("btn-primary");
				this.classList.add("btn-success");
				createDisplayButton();	
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
});
		
function createDisplayButton(){
	if (document.getElementById('displayData')) {
		return;
	}
	const button = document.createElement("button");
	button.id = "displayData";
	button.className = "btn btn-primary w-auto";
	button.textContent = "Show Data from API";
	document.getElementById('button_div').appendChild(button);
	button.addEventListener('click', displayData);
}

function createAPIExamplesButton(){
	if (document.getElementById('callAPIs')) {
		return;
	}
	const button = document.createElement("button");
	button.id = "callAPIs";
	button.className = "btn btn-primary w-auto";
	button.textContent = "Call example APIs";
	document.getElementById('button_div').appendChild(button);
	button.addEventListener('click', callApis);
}

function callApis(){
	    //Slow Response Example
		fetch("https://httpbin.org/delay/10")  // Delays response by 5 seconds
		.then(response => response.json());
		
		//Bad Request Example
		fetch("https://httpbin.org/status/400", { method: "POST" }); // `POST` not allowed here
		
		//404 Not Found Example
		fetch("https://httpbin.org/status/404");
}
		
var post_index = 0
const dataDiv = document.getElementById('data');
dataDiv.innerHTML = '<h2 class="mt-4">Received Data:</h2>';
dataDiv.style.display = "none";
function displayData() {
	if (post_index >= retrievedData.length){
		return;
	}
	if (post_index == 2){
		document.getElementById('data').classList.add('scrollable');
	}
	dataDiv.style.display = "Block";
	const postElement = document.createElement('div');
    postElement.classList.add('mb-3', 'border', 'p-3', 'bg-light');
    postElement.innerHTML = `<strong>${retrievedData[post_index].title} </strong>: ${retrievedData[post_index].body}`;
    dataDiv.appendChild(postElement);
	post_index ++;
	createAPIExamplesButton();
}