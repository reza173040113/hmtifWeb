const userId = document.getElementById('userId');
const namaDonasi = document.getElementById('namaDonasi');
const deskripsi = document.getElementById('deskripsi');
const kategori = document.getElementById('kategori');
const gambarDonasi = document.getElementById('gambarDonasi');
const danaDonasi = document.getElementById('danaDonasi');
const shortDeskripsi = document.getElementById('shortDeskripsi');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const readBtn = document.getElementById('readBtn');
const removeBtn = document.getElementById('removeBtn');
const gambar = document.getElementById("gambar");

const database = firebase.firestore();
const userCollection = database.collection('Donasi');
const urlImg = image.src;


addBtn.addEventListener('click', e => {
    e.preventDefault();
    const ID = userCollection.doc();
    ID.set({
        //type: 'admin'
        namaDonasi : namaDonasi.value,
        danaDonasi : Number(danaDonasi.value),
        deskripsi : deskripsi.value,
        kategori : kategori.value,
        gambarDonasi : gambarDonasi.value
    })
    .then(() => {console.log('Data Successfully');})
    .catch(error  => {console.error(error)});
});

// updateBtn.addEventListener('click', e => {
//     e.preventDefault();
//     userCollection.doc(userId.value).update({
//         namaDonasi : namaDonasi.value,
//         danaDonasi : Number(danaDonasi.value),
//         deskripsi : deskripsi.value,
//         kategori : kategori.value,
//         gambarDonasi : gambarDonasi.value
//         //  type: 'normal'
//     })
//     .then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

// removeBtn.addEventListener('click', e =>{
//     e.preventDefault();
//     userCollection.doc(userId.value).delete().then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

// readBtn.addEventListener('click', e => {
//     e.preventDefault();
    
//     userCollection.get().then(snapshot => {
//       snapshot.forEach(user => {
//          gambar.src = user.data().gambarDonasi
//          console.log(user.data().namaDonasi)
       
//       });
      
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   });

readBtn.addEventListener('click', e => {
  e.preventDefault();
  var donasiHtml = "<h6>Donasi Data</h6>";
  donasiHtml += "<tr>";
  donasiHtml += "<td>Nama Campaign</td>" ;
  donasiHtml += "<td>Dana Campaign</td>" ;
  donasiHtml += "<td>Kategori</td>" ;
  donasiHtml += "<td>Deskripsi</td>" ;
  donasiHtml += "<td>Gambar</td>";
  donasiHtml += "<td>Aksi</td>";
  donasiHtml += "</tr>" 
  userCollection.get().then(snapshot => {
    snapshot.forEach((doc) => {
      var donasi = doc.data();
      donasiHtml += "<tr>";
      donasiHtml += "<td>" + donasi.namaDonasi + "</td>" ;
      donasiHtml += "<td>" + donasi.danaDonasi + "</td>" ;
      donasiHtml += "<td>" + donasi.kategori + "</td>" ;
      donasiHtml += "<td>" + donasi.deskripsi + "</td>" ;
      donasiHtml += "<td><img src=\""+ donasi.gambarDonasi +"\" width=\"300px\" height=\"250px\"></td>";
      donasiHtml += "<td><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#editHero'>Edit Mee!!</button></td>" ;
      donasiHtml += "</tr>" 
    });
    $("#show-donasi").html(donasiHtml);
  })
  .catch(error => {
    console.error(error);
  });
});


// readBtn.addEventListener('click', e => {
//   e.preventDefault();
//   let cards = '';
//   userCollection.get().then(snapshot => {
//     snapshot.forEach((doc) => {
//       var donasi = doc.data();
//     innerHTML.cards += `<div class="col-4">
//       <div class="card">
//     <img src="${donasi.gambarDonasi}" class="card-img-top">
//     <div class="card-body">
//       <h5 class="card-title">${donasi.namaDonasi}</h5>
//         <h6 class="card-subtitle mb-2 text-muted">${donasi.deskripsi}</h6>
//       <a href="detail.php?id=" class="btn btn-primary">show details</a>
//       </div>
//     </div>
//     </div>`;    
//     });
    
//   })
//   .catch(error => {
//     console.error(error);
//   });
// });

// let movieList = document.querySelector('.movie-list');



// readBtn.addEventListener('click', e => {
// 	e.preventDefault();
//   let cards = '';
//   userCollection.get().then(snapshot => {
//     snapshot.forEach((doc) => {
//       var donasi = doc.data();
// 		cards += `<div class="col-4">
// 		    	<div class="card">
// 			  <img src="${donasi.gambarDonasi}" class="card-img-top">
// 			  <div class="card-body">
// 			    <h5 class="card-title">${donasi.namaDonasi}</h5>
// 			   	 <h6 class="card-subtitle mb-2 text-muted">${donasi.danaDonasi}</h6>
// 			    <a href="detail.php?id=${donasi.deskripsi}" class="btn btn-primary">show details</a>
// 				  </div>
// 				</div>
//         </div>`;
//     });
// 	});

// 	movieList.innerHTML = cards;
// 	$('.input-keyword').val('');
// });

// let movieList = document.querySelector('.movie-list');
// readBtn.addEventListener('click', e => {
//   e.preventDefault();
  
//   db.collection("cities").where("state", "==", "CA")
//   .onSnapshot(function(querySnapshot) {
//       var cities = [];
//       querySnapshot.forEach(function(doc) {
//           cities.push(doc.data().name);
//       });
//       console.log("Current cities in CA: ", cities.join(", "));
//   })
//   .catch(error => {
//     console.error(error);
//   });
// });

updateBtn.addEventListener('click', e => {
    e.preventDefault();
  usersCollection.doc(userId.value).get()
  .then(user => {
    if(user.exists)
      console.log(user.data().namaDonasi);
    else
      console.log('User does not exist !');
    })
  .catch(error => {
    console.error(error);
  });
});


  function uploadImage() {
    const ref = firebase.storage().ref()

    const file = document.querySelector("#photo").files[0]

    const name = new Date() + '-' + file.name

    const metadata  = {
      contentType:file.type
    }

    const task  = ref.child(name).put(file,metadata)

    task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url =>{
      
      alert("Image Upload Successful")
      const image = document.querySelector('#image')
      image.src = url
      gambarDonasi.value = url
      
    })
  }


// Aspirasi



// const userId = document.getElementById('userId');
// const name = document.getElementById('name');
// const studentGpa = document.getElementById('studentGpa');
// const studentId = document.getElementById('studentId');
// const studyProgramId = document.getElementById('studyProgramId');
// const addBtn = document.getElementById('addBtn');
// const updateBtn = document.getElementById('updateBtn');
// const readBtn = document.getElementById('readBtn');
// const removeBtn = document.getElementById('removeBtn');


// const database = firebase.firestore();
// const userCollection = database.collection('data');

// addBtn.addEventListener('click', e => {
//     e.preventDefault();
//     const ID = userCollection.doc();
//     ID.set({
//         //type: 'admin'
//         name : name.value,
//         studentGpa : Number(studentGpa.value),
//         studentId : studentId.value,
//         studyProgramId : studyProgramId.value
//     })
//     .then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

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

// removeBtn.addEventListener('click', e =>{
//     e.preventDefault();
//     userCollection.doc(userId.value).delete().then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });

// readBtn.addEventListener('click', e => {
//     e.preventDefault();
//     userCollection.doc(userId).get().then(() => {console.log('Data Successfully');})
//     .catch(error  => {console.error(error)});
// });