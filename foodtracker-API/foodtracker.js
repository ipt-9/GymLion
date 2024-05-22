function getNutrition() {
    var food = document.getElementById("foodInput").value;
    var apiKey = "ac34c59b2a997870eff4326048397fb0";

    // Verbindung mit der Edamam API
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

        // Erstellung einer Tabelle mit das gegeben Essen
        var table = "<table style='border-collapse: collapse; width: 100%;'>";
        table += "<tr><th style='border: 1px solid #ddd; padding: 8px;'>Nährstoff</th><th style='border: 1px solid #ddd; padding: 8px;'>Menge</th><th style='border: 1px solid #ddd; padding: 8px;'>Einheit</th></tr>";

        var nutrientsToShowFirst = ["ENERC_KCAL", "FAT", "PROCNT"];
        nutrientsToShowFirst.forEach(nutrient => {
            var nutrientData = data.totalNutrients[nutrient];
            var nutrientLabel = "";
            switch(nutrient) {
                case "ENERC_KCAL":
                    nutrientLabel = "Energie";
                    break;
                case "FAT":
                    nutrientLabel = "Fett";
                    break;
                case "PROCNT":
                    nutrientLabel = "Protein";
                    break;
                default:
                    nutrientLabel = nutrientData.label;
            }
            table += "<tr>";
            table += "<td style='border: 1px solid #ddd; padding: 8px;'>" + nutrientLabel + "</td>";
            table += "<td style='border: 1px solid #ddd; padding: 8px;'>" + nutrientData.quantity.toFixed(2) + "</td>";
            table += "<td style='border: 1px solid #ddd; padding: 8px;'>" + nutrientData.unit + "</td>";
            table += "</tr>";
        });

        
        table += "<tr id='moreNutrientsRow' style='display: none;'><td colspan='3' style='padding: 0;'><div id='moreNutrientsContent'>";
        for (var key in data.totalNutrients) {
            if (!nutrientsToShowFirst.includes(key)) {
                var nutrientData = data.totalNutrients[key];
                table += "<div style='border-top: 1px solid #ddd; margin: 0; padding: 8px;'>";
                table += "<span>" + nutrientData.label + ": </span>";
                table += "<span>" + nutrientData.quantity.toFixed(2) + " " + nutrientData.unit + "</span>";
                table += "</div>";
            }
        }
        table += "</div></td></tr>";


        table += "<tr><td colspan='3' style='padding: 0;'><button onclick='toggleMoreNutrients()' id='toggleButton'>Nährstoffe anzeigen</button></td></tr>";

        table += "</table>";

        document.getElementById("nutritionInfo").innerHTML = table;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Button
function toggleMoreNutrients() {
    var moreNutrientsRow = document.getElementById("moreNutrientsRow");
    var button = document.getElementById("toggleButton");
    if (moreNutrientsRow.style.display === "none") {
        moreNutrientsRow.style.display = "table-row";
        button.textContent = "Nährstoffe ausblenden";
    } else {
        moreNutrientsRow.style.display = "none";
        button.textContent = "Nährstoffe anzeigen";
    }
}

document.getElementById("analyzeButton").addEventListener("click", getNutrition);

