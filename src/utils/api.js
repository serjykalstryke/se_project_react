const baseUrl = "http://localhost:3001";
const headers = {
    'Content-Type': 'application/json'
};

const handleServerResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`API error: ${res.status}`);
    }
    return res.json();
}

const getItems = () => {
    return fetch(`${baseUrl}/items`, {
        headers
    }).then(handleServerResponse);
};

const addItem = ({ name, weather, imageUrl }) => {
    return fetch(`${baseUrl}/items`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ name, weather, imageUrl })
    }).then(handleServerResponse)
};

const deleteItem = (itemId) => {
    return fetch(`${baseUrl}/items/${itemId}`, {
        method: 'DELETE',
        headers
    }).then(handleServerResponse);
};

export { getItems, addItem, deleteItem };





