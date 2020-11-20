
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
          isEnable: true,
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
  firebase.firestore().collection("Aspirasi").where("isEnable", "==", false).onSnapshot(function (snapshot) {
   
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
  firebase.firestore().collection("Aspirasi").where("isEnable", "==", true).onSnapshot(function (snapshot) {
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
      </div>
            
`

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