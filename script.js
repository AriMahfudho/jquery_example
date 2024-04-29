// $(document).ready(function () {

//   function tampilkanpopup() {
//     $('#popup').css('display', 'block');
//   }

//   function tampilkanerrorlokasi() {
//     $('#infocuaca').html('<div class="infocuaca-box"><p>Lokasi tidak ditemukan.</p></div>');
//   }

//   function sembunyikanpopup() {
//     $('#popup').css('display', 'none');
//   }
  
//   function ambillokasi(lokasi) {
//     tampilkanpopup();

//     var apiKey = '8c583c9f754c2e68dbe3a13b1d6bd5ce';
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + lokasi + '&appid=' + apiKey;

//     $.ajax({
//       url: apiUrl,
//       type: 'GET',
//       dataType: 'json',
//       success: function (data) {
//         setTimeout(function () {
//           sembunyikanpopup();
//           menampilkancuaca(data);
//         }, 1000);
//       },
//       error: function (xhr, status, error) {
//         console.error('Terjadi kesalahan dalam mengambil data cuaca.');
//         setTimeout(function () {
//           sembunyikanpopup();
//           tampilkanerrorlokasi(); 
//         }, 1000);
//       }
//     });
//   }

//   function menampilkancuaca(data) {
//     var infocuaca = '<div class="infocuaca-box">';
//     infocuaca += '<div class="infocuaca-info">';
//     infocuaca += '<h2>' + data.name + '</h2>';
//     infocuaca += '<p><b>Cuaca:</b> ' + data.weather[0].main + '</p>';
//     infocuaca += '<p><b>Deskripsi:</b> ' + data.weather[0].description + '</p>';
//     infocuaca += '<p><b>Temperatur:</b> ' + (data.main.temp - 273.15).toFixed(2) + '°C</p>';
//     infocuaca += '<p><b>Tekanan Udara:</b> ' + data.main.pressure + ' hPa</p>';
//     infocuaca += '<p><b>Kelembaban:</b> ' + data.main.humidity + '%</p>';
//     infocuaca += '<p><b>Kecepatan Angin:</b> ' + data.wind.speed + ' m/s</p>';
//     infocuaca += '</div>';
//     infocuaca += '</div>';

//     $('#infocuaca').html(infocuaca);
//   }
  
//   $('#submit').click(function () {
//     var lokasi = $('#lokasi').val();
//     ambillokasi(lokasi);
//   });

//   $('.button-close').click(function () {
//     sembunyikanpopup();
//   });

//   function resetWeather() {
//     $('#infocuaca').html('');
//   }
  
//   $('#reset').click(function () {
//     tampilkanpopup(); 
//     setTimeout(function () {
//       resetWeather();
//       sembunyikanpopup();
//     }, 1000);
//   });
// });
$(document).ready(function() {
  $('#searchBtn').on('click', function() {
      var query = $('#searchInput').val();
      if (query !== '') {
          searchImages(query);
      }
  });
});

function searchImages(query) {
  var apiKey = '42988277-55aeb4dbda65e98517ce52f5a';
  var apiUrl = 'https://pixabay.com/api/?key=' + apiKey + '&q=' + query;

  $.ajax({
      url: apiUrl,
      method: 'GET',
      success: function(data) {
          displayImages(data.hits);
      },
      error: function(xhr, status, error) {
          displayError('Failed to fetch images. Please try again later.');
      }
  });
}

function displayImages(images) {
  var resultsDiv = $('#imageResults');
  resultsDiv.empty();

  $.each(images, function(index, image) {
      var imageUrl = image.previewURL;
      var imageTitle = image.tags;

      var imageItem = $('<div class="image-item"></div>');
      var imageElement = $('<img>').attr('src', imageUrl).attr('alt', imageTitle);

      imageItem.append(imageElement);
      resultsDiv.append(imageItem);
  });
}

function displayError(message) {
  var resultsDiv = $('#imageResults');
  resultsDiv.empty();

  resultsDiv.append('<p>' + message + '</p>');
}