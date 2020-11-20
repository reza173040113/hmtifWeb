
const database = firebase.firestore();
const userCollection = database.collection('Donasi');


$("#create-campaign-button").click(function(){
  var donasi = {
    namaDonasi: $("#namaDonasi").val(),
    danaDonasi: $("#danaDonasi").val(),
    deskripsi: $("#deskripsi").val(),
    kategori: $("#kategori").val(),
    gambarDonasi: $("#gambarDonasi").val(),

  }
  addDonasi(donasi);
  console.log("berhasil ditambahkan");

});

function addDonasi(h){
  firebase.firestore().collection("Donasi").add(h);
  
}

// Clear modal
let template = null;
    $('.modal').on('show.bs.modal', function(event) {
      template = $(this).html();
    });

    $('.modal').on('hidden.bs.modal', function(e) {
      $(this).html(template);
    });


function detailShow(id){
const database = firebase.firestore();
const userCollection = database.collection('Donasi');
userCollection.doc(id).get()
  .then(donasis => {
    donasi = donasis.data();
    if(donasis.exists)
    document.getElementById("detailSection").innerHTML += `
    <img class="card-img-top" src="${donasi.gambarDonasi}" alt="Card image cap">
    <div class="card-body">
      <h4 class="card-title">${donasi.namaDonasi}</h4>
      <p class="card-text kategori">${donasi.kategori}</p>
      <p class="card-text dana">Dana yang dibutuhkan : Rp.${donasi.danaDonasi}</p>
      <p class="card-text deskripsi">${donasi.deskripsi}</p>
    </div>
  </div>
    
`
    else
      console.log('Campaign does not exist !');
    })
  .catch(error => {
    console.error(error);
  });
}

function readCampaign() {
  firebase.firestore().collection("Donasi").onSnapshot(function (snapshot) {
    document.getElementById("cardSection").innerHTML = '';
    snapshot.forEach(function (donasiValue) {
      var donasi = donasiValue.data();
      document.getElementById("cardSection").innerHTML += `
          <div class="column">
          <div clas="card">
          <img class="card-img-top" src="${donasi.gambarDonasi}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${donasi.namaDonasi}</h5>
            <p class="card-text kategori" style="display:none">${donasi.kategori}</p>
            <p class="card-text">Dana yang dibutuhkan :</p>
            <p class="card-text dana">${donasi.danaDonasi}</p>
            <p class="card-text deskripsi" style="display:none">${donasi.deskripsi}</p>
            <p class="card-text gambar" style="display:none">${donasi.gambarDonasi}</p>

            <button type="button" id="detail-btn"  class="btn btn-success" onclick="detailShow('${donasiValue.id}')" data-toggle="modal" data-target="#detailModal">Details</button>
            <button type="button" id="edit-donasi-btn" data-heroId="${donasiValue.id}" class="btn btn-success edit-donasi-btn" data-toggle="modal" data-target="#editModal">Edit</button>
            <button type="submit" class="btn btn-success" onclick="deleteCamp('${donasiValue.id}')">Hapus</button>
          </div>
        </div>
            </div>
`

    });
  });
}

function deleteCamp(id){
  firebase.firestore().collection("Donasi").doc(id).delete().then(() => {
    console.log("data dihapus");
  });
}

$(document).on('click', '.edit-donasi-btn', function(){
  var campaignId = $(this).attr('data-heroId');
  console.log("you click " + campaignId);
  $('#campaignId').val(campaignId);

  var nama = $(this).parent().find('.card-title').text();
  $('#namaDonasiEdit').val(nama);

  var dana = $(this).parent().find('.dana').text();
  $('#danaDonasiEdit').val(dana);

  var kategori = $(this).parent().find('.kategori').text();
  $('#kategoriEdit').val(kategori);

  var deskripsi = $(this).parent().find('.deskripsi').text();
  $('#deskripsiEdit').val(deskripsi);

  var gambar = $(this).parent().find('.gambar').text();
  $('#gambarDonasiEdit').val(gambar);


});


$('#edit-campaign-button').click(function(){
  const database = firebase.firestore();
  const userCollection = database.collection('Donasi');
   const idCamp = $('#campaignId').val();
        userCollection.doc(idCamp).update({
          namaDonasi: $("#namaDonasiEdit").val(),
          deskripsi: $("#deskripsiEdit").val(),
          danaDonasi : $("#danaDonasiEdit").val(),
          kategori : $("#kategoriEdit").val(),
          gambarDonasi : $("#gambarDonasiEdit").val(),
        })
        .then(() => {console.log('Data Successfully');})
        .catch(error  => {console.error(error)});
  
});


function uploadImage() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photo").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {

      alert("Image Upload Successful")
      const image = document.querySelector('#image')
      image.src = url
      document.getElementById("gambarDonasi").value = url

    })
}


function uploadImageEdit() {
  const ref = firebase.storage().ref()

  const file = document.querySelector("#photoEdit").files[0]

  const name = new Date() + '-' + file.name

  const metadata = {
    contentType: file.type
  }

  const task = ref.child(name).put(file, metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(urlEdit => {

      alert("Image Upload Successful")
      const imageEdit = document.querySelector('#imageEdit')
      imageEdit.src = urlEdit
      document.getElementById("gambarDonasiEdit").value = urlEdit

    })
}