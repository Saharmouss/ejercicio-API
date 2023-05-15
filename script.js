const videoFileInput = document.getElementById('videoFileInput');
const videoPlayer = document.getElementById('videoPlayer');
const Play= document.getElementById('Play');
const Pause= document.getElementById('Pause');
const volumeSlider = document.getElementById('volumeSlider');

videoFileInput.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];
  const videoType = /^video\//;

  if (videoType.test(file.type)) {
    loadVideoFile(file);
  } else {
    alert('Por favor, selecciona un archivo de vídeo válido.');
  }
}

function loadVideoFile(file) {
  const fileURL = URL.createObjectURL(file);

  videoPlayer.src = fileURL;
  videoPlayer.onloadedmetadata = function() {
    Play.disabled = false;
    Pause.disabled = false;
    volumeSlider.disabled = false;
    URL.revokeObjectURL(fileURL);
  };

  videoPlayer.onerror = function() {
    alert('Ha ocurrido un error al cargar el vídeo.');
  };

  videoPlayer.onwaiting = function() {
    alert('El vídeo está cargando. Por favor, espera unos momentos.');
  };
}

Play.addEventListener('click', function() {
  videoPlayer.play();
});

Pause.addEventListener('click', function() {
  videoPlayer.pause();
});

volumeSlider.addEventListener('input', function() {
  videoPlayer.volume = volumeSlider.value;
});
