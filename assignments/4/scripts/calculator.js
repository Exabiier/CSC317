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
    display.textContent = caculatorState.curretInput;
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







// 



