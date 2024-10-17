async function fetchItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = items.map((item, index) => `<li>${item} <button onclick="deleteItem(${index})">Delete</button></li>`).join('');
}

async function addItem() {
    const newItemInput = document.getElementById('newItem');
    const newItem = newItemInput.value;

    if (newItem) {
        await fetch('/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: newItem }) // Wrap in an object
        });
        newItemInput.value = '';
        fetchItems(); // Refresh the list after adding
    }
}


async function deleteItem(index) {
    await fetch(`/api/items/${index}`, {
        method: 'DELETE'
    });
    fetchItems();
}

// Initial fetch of items
fetchItems();
