document.getElementById('fetchExercises').addEventListener('click', function() {
  // Hole die Werte, die vom Benutzer in die Eingabefelder für Muskelgruppe und Übungstyp eingegeben wurden.
  const muscle = document.getElementById('muscle').value;
  const type = document.getElementById('type').value;

  fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}`, {
      method: 'GET',
      headers: { 'X-Api-Key': 'kzzJT7mD//OHnMUZf42lnA==k72OhIItWd6bvlwl' },
  })
  .then(response => response.json()) // Konvertiere die Antwort der API in ein JSON-Format.
  .then(data => { // Verarbeite die JSON-Daten, die von der API zurückgegeben werden.
      const exercisesDiv = document.getElementById('exercises'); // Wähle das div, in dem die Übungen angezeigt werden.
      exercisesDiv.innerHTML = ''; // Lösche den vorherigen Inhalt im exercises div.

      // Iteriere durch jede Übung im Daten-Array.
      data.forEach(exercise => {
          const exerciseDiv = document.createElement('div'); // Erstelle ein neues div-Element für jede Übung.
          exerciseDiv.classList.add('exercise'); // Füge eine Klasse zum Übungs-div für das Styling hinzu.
          
          // Setze das innere HTML des Übungs-div mit den Übungsdetails.
          exerciseDiv.innerHTML = `
              <h3>${exercise.name}</h3>
              <p><strong>Type:</strong> ${exercise.type}</p>
              <p><strong>Muscle:</strong> ${exercise.muscle}</p>
              <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
              <p><strong>Equipment:</strong> ${exercise.equipment}</p>
              <p>${exercise.instructions}</p>
          `;
          exercisesDiv.appendChild(exerciseDiv); // Füge das Übungs-div zum exercises-Container hinzu.
      });
  })
  .catch(error => console.error('Error:', error)); // Fange und protokolliere alle Fehler, die während des Fetch-Vorgangs auftreten.
});
