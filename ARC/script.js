// Create the grid cells
const grids = document.querySelectorAll(".grid");
grids.forEach(grid => {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }
});

const token = "";
// Fetch the JSON data
document.querySelector('.loading-spinner').style.display = 'block';

let taskNames = [];
//fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/gpt-4", {headers: {'Authorization': `token ${token}`} })
fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/gpt-4")
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach((task, index) => {
            if (!taskNames.includes(task.name)) {
                taskNames.push(task.name);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the list of tasks:", error);
    });

//fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/gpt-3.5-turbo-instruct", {headers: {'Authorization': `token ${token}`} })
fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/gpt-3.5-turbo-instruct")
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach((task, index) => {
            if (!taskNames.includes(task.name)) {
                taskNames.push(task.name);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the list of tasks:", error);
    });

//fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/gpt-3.5-turbo", {headers: {'Authorization': `token ${token}`} })
fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/gpt-3.5-turbo")
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach((task, index) => {
            if (!taskNames.includes(task.name)) {
                taskNames.push(task.name);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the list of tasks:", error);
    });

//fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/text-davinci-003", {headers: {'Authorization': `token ${token}`} })
fetch("https://api.github.com/repos/alxndrTL/ARC_LLMs/contents/responses/text-davinci-003")
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach((task, index) => {
            if (!taskNames.includes(task.name)) {
                taskNames.push(task.name);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the list of tasks:", error);
    });

let tasksList = [];

//fetch("https://api.github.com/repos/fchollet/ARC/contents/data/training", {headers: {'Authorization': `token ${token}`} })
fetch("https://api.github.com/repos/fchollet/ARC/contents/data/training")
    .then(response => response.json())
    .then(tasks => {

        tasks.forEach((task, index) => {
            if (taskNames.includes(task.name)){
                tasksList.push(task)
            }
        })

        fetchRandomTask();  // Fetch the first random task after loading the list
    })
    .catch(error => {
        console.error("Error fetching the list of tasks:", error);
    });

function fetchRandomTask() {
    const randomTaskIndex = Math.floor(Math.random() * tasksList.length);
    const task = tasksList[randomTaskIndex];
    const taskName = task.name.split('.')[0];

    fetch(task.download_url)
        .then(response => response.json())
        .then(jsonData => {
            // Use the data to populate the grids
            document.querySelector('h1').innerText = `ARC Task ${taskName}`;
            populateGrids(jsonData, taskName);
        })
        .catch(error => {
            console.error("Error fetching the task data:", error);
        });
}

function populateGrids(jsonData, taskName) {
    const demoContainer = document.querySelector('.tasks');
    // Clear previous demos
    demoContainer.innerHTML = '';
    
    jsonData.train.forEach((example, index) => {
        // Create the demo structure dynamically
        const demoElement = document.createElement('div');
        demoElement.className = 'demo';
        
        const demoLabel = document.createElement('h3');
        demoLabel.innerText = `Demo ${index + 1}`;
        demoElement.appendChild(demoLabel);
    
        const inputContainer = document.createElement('div');
        inputContainer.className = 'grid input';
        demoElement.appendChild(inputContainer);
        
        const arrowElement = document.createElement('div');
        arrowElement.className = 'arrow';
        arrowElement.innerHTML = '↓';
        demoElement.appendChild(arrowElement);
            
        const outputContainer = document.createElement('div');
        outputContainer.className = 'grid output';
        demoElement.appendChild(outputContainer);
            
        demoContainer.appendChild(demoElement);
    
        renderGrid(example.input, inputContainer);
        renderGrid(example.output, outputContainer);
    });
    
    const testInputContainer = document.querySelector('.test .grid.input');
    const testOutputContainer = document.querySelector('.test .grid.output');
    
    renderGrid(jsonData.test[0].input, testInputContainer);
    renderGrid(jsonData.test[0].output, testOutputContainer);

    const llmNames = ["GPT-4", "text-davinci-003", "GPT-3.5 Instruct", "GPT-3.5"];
    const llmLinks = {
        "GPT-4": "https://api.github.com/repos/alxndrTL/ARC_LLMS/contents/responses/gpt-4/",
        "text-davinci-003": "https://api.github.com/repos/alxndrTL/ARC_LLMS/contents/responses/text-davinci-003/",
        "GPT-3.5 Instruct": "https://api.github.com/repos/alxndrTL/ARC_LLMS/contents/responses/gpt-3.5-turbo-instruct/",
        "GPT-3.5": "https://api.github.com/repos/alxndrTL/ARC_LLMS/contents/responses/gpt-3.5-turbo/"
    };

     // Clear existing response wrapper
    const existingResponseWrapper = document.querySelector('.test .response-wrapper');
    if (existingResponseWrapper) {
        existingResponseWrapper.remove();
    }

    // Create a response wrapper div
    const responseWrapper = document.createElement('div');
    responseWrapper.className = 'response-wrapper';
    document.querySelector('.test').appendChild(responseWrapper);

    // Create container for the true response
    const trueResponseContainer = document.createElement('div');
    const trueLabel = document.createElement('h4');
    trueLabel.innerText = 'True';
    trueResponseContainer.appendChild(trueLabel);
    trueResponseContainer.appendChild(testOutputContainer);
    responseWrapper.appendChild(trueResponseContainer);

    // Create new LLM grids inside the response wrapper
    llmNames.forEach((llmName, index) => {
        const llmResponseContainer = document.createElement('div');
        const llmURL = llmLinks[llmName];

        const llmLabel = document.createElement('h4');
        llmLabel.innerText = llmName;
        llmResponseContainer.appendChild(llmLabel);

        const llmOutputContainer = document.createElement('div');
        llmOutputContainer.className = `grid output llm-${index + 1}`;
        llmResponseContainer.appendChild(llmOutputContainer);

        responseWrapper.appendChild(llmResponseContainer);
        fetchLLMResponse(taskName, llmOutputContainer, llmURL);
    });

    document.querySelector('.loading-spinner').style.display = 'none';
}

function fetchLLMResponse(taskName, container, llmURL) {
    // Dummy fetch for now. Just fetching the same task.
    console.log(taskName);
    //fetch(`${llmURL}${taskName}.json`, {headers: {'Authorization': `token ${token}`} })
    fetch(`${llmURL}${taskName}.json`)
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                throw new Error(`No LLM data available for task ${taskName}`);
            }
            return response.json();
        })
        .then(task => {
            fetch(task.download_url)
                .then(response => {
                    // Check if the response is OK
                    if (!response.ok) {
                        throw new Error(`No LLM data available for task ${taskName}`);
                    }
                    return response.json();
                })
                .then(jsonData => {
                    console.log(jsonData);
                    renderGrid(jsonData.test[0].output, container); // Simulating LLM response with the actual output
                })
        })
        .catch(error => {
            console.log(error.message); // This will log a more friendly message instead of the error stack trace
            // You can also display a default or fallback action here if desired
        });
}

function renderGrid(data, container) {
    const numRows = data.length;
    const numCols = data[0].length;

    // Calculate dynamic cell size based on grid max size
    const maxGridSize = 300;  // Same as in the CSS
    const gridGap = 0.5;  // as you've defined a gap of 1px in your CSS
    const cellSize = Math.floor(Math.min((maxGridSize - gridGap * (numRows - 1)) / numRows, (maxGridSize - gridGap * (numCols - 1)) / numCols));

    // Set grid CSS dynamically
    container.style.gridTemplateColumns = `repeat(${numCols}, ${cellSize}px)`;
    container.style.gridTemplateRows = `repeat(${numRows}, ${cellSize}px)`;
    container.style.width = `${numCols * (cellSize+gridGap)}px`;
    container.style.height = `${numRows * (cellSize+gridGap)}px`;

    // Clear previous cells
    container.innerHTML = '';

    data.forEach(row => {
        row.forEach(cellValue => {
            const cell = document.createElement('div');
            cell.className = getColorClass(cellValue);
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            container.appendChild(cell);
        });
    });
}

document.getElementById('regenerateData').addEventListener('click', function() {
    // Generate a random number, say between 1 and 10 (or however many JSON files you have)
    document.querySelector('.loading-spinner').style.display = 'block';
    fetchRandomTask();
});

function updatePageWithData(data) {
    // Implement this function to update your page with the new data
    // For example, update the grid cells or any other elements with the new data values
    populateGrids(data);

}

// Translate the cell value to a color
function getColorClass(value) {
    const colorMap = {
        0: 'black',
        1: 'blue',
        2: 'red',
        3: 'green',
        4: 'yellow',
        5: 'grey',
        6: 'pink',
        7: 'orange',
        8: 'cyan',
        9: 'dark-red'
    };
    return colorMap[value] || '';  // Return the color or an empty string if value is not in the map
}
