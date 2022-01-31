const puzzleBoard = document.querySelector('#puzzle')
const solveButton = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81

const submission = []

for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', '1')
    inputElement.setAttribute('max', '9')
    puzzleBoard.appendChild(inputElement)
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53) 
    ) {
        inputElement.classList.add('odd-section')
    }
}


const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            submission.push(input.value);
        } else {
            submission.push('.')
        }
    })
    console.log(submission)
}

const populateValues = (solution, solvable) => {
    console.log('solution', solution)
    const inputs = document.querySelectorAll('input')
    if (solvable && solution){
        inputs.forEach((input, i) => {
            console.log(solution[i])
            input.value = solution[i]
        })
        solutionDisplay.innerHTML = 'This is the answer'
    } else {
        solutionsDisplay.innerHTML = 'This is not solvable'
    }
}

const solve = () => {
    joinValues()
    const data = submission.join('')
    console.log(data)
    var options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
        },
        data: {
            puzzle: data
        }
    };

    axios.request(options).then((response) => {
        console.log(response.data);
        populateValues(response.data.solution, response.data.solvable)
    }).catch((error) => {
        console.error(error);
    });
}


solveButton.addEventListener('click', solve)

