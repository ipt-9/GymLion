document.getElementById('fetchExercises').addEventListener('click', function() {
  const muscle = document.getElementById('muscle').value;
  const type = document.getElementById('type').value;

  fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&type=${type}`, {
      method: 'GET',
      headers: { 'X-Api-Key': 'kzzJT7mD//OHnMUZf42lnA==k72OhIItWd6bvlwl' },
  })
  .then(response => response.json())
  .then(data => {
      const exercisesDiv = document.getElementById('exercises');
      exercisesDiv.innerHTML = '';
      data.forEach(exercise => {
          const exerciseDiv = document.createElement('div');
          exerciseDiv.classList.add('exercise');
          exerciseDiv.innerHTML = `
              <h3>${exercise.name}</h3>
              <p><strong>Type:</strong> ${exercise.type}</p>
              <p><strong>Muscle:</strong> ${exercise.muscle}</p>
              <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
              <p><strong>Equipment:</strong> ${exercise.equipment}</p>
              <p>${exercise.instructions}</p>
          `;
          exercisesDiv.appendChild(exerciseDiv);
      });
  })
  .catch(error => console.error('Error:', error));
});
