// state of the caculator 
const caculatorState = {
curretInput: '0',
previousInput: null,
operator: null,
resetOrNot: false,
};

// We need to get the display element to show the current input and results
const display = document.getElementById('display');

// function to update the display
function updateNow(){
    display.value = caculatorState.curretInput;
}

// Reseting all State for caculator
function clearAll(){
    caculatorState.curretInput = '0';
    caculatorState.previousInput = null;
    caculatorState.operator = null;
    caculatorState.resetOrNot = false;
    updateNow();
}

function caculator(){
    if (caculatorState.operator && caculatorState.previousInput !== null){
        let prev = parseFloat(caculatorState.previousInput);
        let current = parseFloat(caculatorState.curretInput);
        let result = 0;

        // Reviced to a switch statemtent for better readability
        switch(caculatorState.operator){
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            // 
            case '/':
                // Need to handle the undifined case
                if (current === 0){
                    caculatorState.curretInput = 'NaN';
                    caculatorState.previousInput = null;
                    caculatorState.operator = null;
                    caculatorState.resetOrNot = true;
                    updateNow();
                    return;     
                }
                result = prev / current;
                break;
            default:
                return;
        }
        caculatorState.curretInput = result.toString();
        caculatorState.previousInput = null;
        caculatorState.operator = null;
        caculatorState.resetOrNot = true;
        updateNow();
    }
}

 
////////////////////////////////////////////////////////////////// 
////////////////////// Input Handlers ///////////////////////
//////////////////////////////////////////////////////////////////


// Putting number in the input or apprending digits to old number
function handleNumber(number){
    if(caculatorState.resetOrNot){
        caculatorState.curretInput = number;
        caculatorState.resetOrNot = false;
    } else {
        if(caculatorState.curretInput === '0'){
            caculatorState.curretInput = number;
        } else {
            caculatorState.curretInput += number;
        }
    }
    updateNow();
}

// when to add a decimal point to number
function handleDecimal(){
    if(caculatorState.resetOrNot){
        caculatorState.curretInput = '0.';
        caculatorState.resetOrNot = false;
    } else if(!caculatorState.curretInput.includes('.')){
        caculatorState.curretInput += '.';

    }
    updateNow();
}

// we need the fucntion to handle logic for positive and negative numbers
function handlePositiveNegative(){
    if(caculatorState.curretInput !== '0'){
        // True if the current input is negative
        if(caculatorState.curretInput.startsWith('-')){
            // with slice we remove the negative sign
            caculatorState.curretInput = caculatorState.curretInput.slice(1);
        }
        // False if the current input is positive to turn to negative number
        else {
            caculatorState.curretInput = '-' + caculatorState.curretInput;
        }
        updateNow();
    }
}

function handlePercentage(){
    let current = parseFloat(caculatorState.curretInput);
    current = current / 100;
    caculatorState.curretInput = current;
    updateNow();
}

function handleOperator(operator){
    // if can't do math with null previous input
    if(caculatorState.previousInput !== null){
        caculator();
    }

    caculatorState.previousInput = caculatorState.curretInput;
    caculatorState.operator = operator;
    caculatorState.resetOrNot = true;

}

document.addEventListener('keydown', function(event){
    const key = event.key;

    // checks if there are numbers being entered:
    if (key >= '0' && key <= '9') {
        handleNumber(key);
        return
    }

    // Handle everything else with switch
    switch (key) {
        case '+':
            handleOperator('+');
            break;
        case '-':
            handleOperator('-');
            break;
        case '*':
            handleOperator('*');
            break;
        case '/':
            event.preventDefault();
            handleOperator('/');
            break;
        case 'Enter':
        case '=':
            caculator();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            clearAll();
            break;
        case '.':
            handleDecimal();
            break;
        case '%':
            handlePercentage();
            break;
    }
});



// Need this so caculator display updates on load
updateNow();
