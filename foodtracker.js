function getNutrition() {
    var food = document.getElementById("foodInput").value;
    var apiKey = "ac34c59b2a997870eff4326048397fb0";

    var url = `https://api.edamam.com/api/nutrition-details?app_id=486f122c&app_key=${apiKey}`;
    var data = {
        ingr: [food]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {

        showNutritionInfo(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showNutritionInfo(data) {
    const nutritionInfoDiv = document.getElementById('nutritionInfo');

    nutritionInfoDiv.innerHTML = '';

    for (const [nutrient, value] of Object.entries(data.totalNutrients)) {
        const nutrientItem = document.createElement('p');
        nutrientItem.textContent = `${value.label}: ${value.quantity} ${value.unit}`;
        nutritionInfoDiv.appendChild(nutrientItem);
    }
}
