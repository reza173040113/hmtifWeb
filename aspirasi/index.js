
const database = firebase.firestore();
const userCollection = database.collection('Donasi');

$("#create-newhero-button").click(function(){
  var aspirasi = {
    name: $("#inputNamaAspirasi").val(),
    deskripsi: $("#inputDeskripsi").val(),
    jumlahLike: 0,
    isEnable: false,

  }
  addAspirasi(aspirasi);

});

function addAspirasi(h){
  firebase.firestore().collection("Aspirasi").add(h);
  
}

$('#edit-newhero-button').click(function post(){
  const database = firebase.firestore();
  const userCollection = database.collection('Aspirasi');
   const idAsp = $('#heroId').val();
        userCollection.doc(idAsp).update({
          name: $("#inputNamaAspirasiEdit").val(),
          deskripsi: $("#inputDeskripsiEdit").val(),
          jumlahLike: 0,
          isEnable: "y",
        })
        .then(() => {alert("Aspirasi dan Keluhan berhasil di post!!!");})
        .catch(error  => {console.error(error)});
  
});

// updateBtn.addEventListener('click', e => {
//     e.preventDefault();
//     userCollection.doc(userId.value).update({
//         name : name.value,
//         studentGpa : Number(studentGpa.value),
//         studentId : studentId.value,
//         studyProgramId : studyProgramId.value
//         //  type: 'normal'
//     })
//     .then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

function deleteAsp(id){
  firebase.firestore().collection("Aspirasi").doc(id).delete().then(() => {
    console.log("data dihapus");
  });
}


function readAsp() {
  firebase.firestore().collection("Aspirasi").where("isEnable", "==", "n").onSnapshot(function (snapshot) {
   
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (aspirasiValue) {
      var aspirasi = aspirasiValue.data();
      document.getElementById("cardSection").innerHTML += `
      <div class="column col-md-6">
      <div class="card" style="width: 36rem;">
        <div class="card-body">
          <h5 class="card-title">${aspirasi.name}</h5>
          <p class="card-text">${aspirasi.deskripsi}</p>
          <button type="button" id="edit-aspirasi-btn" data-heroId="${aspirasiValue.id}" class="btn btn-success edit-aspirasi-btn" data-toggle="modal" data-target="#editModal">Post</button>

        </div>
      </div>
      </div>`
      

    });
  
  // else{
  //       document.getElementById("cardSection").innerHTML = '<h1 style="text-align:center;">Tidak ada aspirasi';

  // }
  });
}

function readPostAsp() {
  firebase.firestore().collection("Aspirasi").where("isEnable", "==", "y").onSnapshot(function (snapshot) {
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (aspirasiValue) {
      var aspirasi = aspirasiValue.data();
      var x1 = aspirasiValue.data()['name'];
      var x2 = aspirasiValue.data()['jumlahLike'];
      document.getElementById("cardSection").innerHTML += `

      <div class="column col-md-6">
      <div class="card" style="width: 36rem;">
        <div class="card-body">
          <h5 class="card-title">${aspirasi.name}</h5>
          <p class="card-text">${aspirasi.deskripsi}</p>
          <p class="card-text">${aspirasi.jumlahLike}</p>

          <button type="button" id="edit-aspirasi-btn" data-heroId="${aspirasiValue.id}" class="btn btn-success edit-aspirasi-btn" data-toggle="modal" data-target="#editModal">Post</button>

        </div>
      </div>
      </div>`
        // document.getElementById("chart").innerHTML=`<canvas id="myChart"></canvas>`;
        //       var ctx = document.getElementById('myChart').getContext('2d');
        // var myChart = new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //         labels: [x1,x1],
        //         datasets: [{
        //             label: '# of Votes',
        //             data: [x2,x2],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255, 99, 132, 1)',
        //                 'rgba(54, 162, 235, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }]
        //         }
        //     }
        // });

    });
  });
}
function readChart() {
  firebase.firestore().collection("Aspirasi").orderBy("jumlahLike").onSnapshot(function (snapshot) {
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (aspirasiValue) {
      var aspirasi = aspirasiValue.data();
      var x1 = aspirasiValue.data()['name'];
      var x2 = aspirasiValue.data()['jumlahLike'];
      console.log(x1);
      // document.getElementById("jumlahLike").innerHTML=`${snapshot.val()}`;
      // x2 = snapshot.val();
      document.getElementById("chart").innerHTML=`<canvas id="myChart"></canvas>`;
      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: [x1],
              datasets: [{
                  label: '# of Votes',
                  data: [x2],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });

    });
  });
}
$(document).on('click', '.edit-aspirasi-btn', function tampilById(){
  var heroId = $(this).attr('data-heroId');
  $('#heroId').val(heroId);
  console.log("you click " + heroId);
  var nama = $(this).parent().find('.card-title').text();
  var nama2 = $(this).parent().find('.card-text').text();
  $('#inputNamaAspirasiEdit').val(nama);
  $('#inputDeskripsiEdit').val(nama2);

});