import axios from 'axios';

export const REQUEST_MEMORY = 'REQUEST_MEMORY';
export const RETRIEVED_MEMORY = 'RETRIEVED_MEMORY';

function requestMemory() {
    return {
        type: REQUEST_MEMORY
    }
}

function retrievedMemory(json) {
    return {
        type: RETRIEVED_MEMORY,
        memories: json
    }
}

export function fetchMemoryWithId(memoryId) {
    return function(dispatch) {
        dispatch(requestMemory());        
        axios.get('/secure/memory' + memoryId)
            .then(function (response) {
               dispatch(retrievedMemory(response)); 
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}