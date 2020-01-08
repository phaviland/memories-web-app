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
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(function (response) {
               dispatch(retrievedMemory(response)); 
            });
    }
}