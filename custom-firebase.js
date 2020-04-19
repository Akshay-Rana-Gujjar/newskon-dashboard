// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA9xHygp3hJXudlJ7HfLa_PVxReyjjf1rI",
  authDomain: "newskon-app.firebaseapp.com",
  databaseURL: "https://newskon-app.firebaseio.com",
  projectId: "newskon-app",
  storageBucket: "newskon-app.appspot.com",
  messagingSenderId: "940035168965",
  appId: "1:940035168965:web:3650dba256adaa06216eac",
  measurementId: "G-ZLQNC3DHCF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

var cID = "05d53768601f38f";
var cSecret = "52ae3f556b65c1cb798f8448d12acf235017c2e1";


function initFileUpload() {

  var imageStatus = $("#image-status");
  $('input[type=file]').on("change", function () {

    var $files = $(this).get(0).files;

    if ($files.length) {

      console.log($files[0].size);

      // Reject big files
      if ($files[0].size > $(this).data("max-size") * 1024) {
        console.log("Please select a smaller file");
        imageStatus.html("<span style='color:red;'>Please select a smaller file than 1 mb</span>");

        return false;
      }

      // Begin file upload
      console.log("Uploading file to Imgur..");
      imageStatus.html("Uploading file to Imgur..");

      // Replace ctrlq with your own API key
      var apiUrl = 'https://api.imgur.com/3/image';
      var apiKey = cID;

      var settings = {
        async: true,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'POST',
        url: apiUrl,
        headers: {
          Authorization: 'Client-ID ' + apiKey,
          Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
      };

      var formData = new FormData();
      formData.append("image", $files[0]);
      settings.data = formData;

      // Response contains stringified JSON
      // Image URL available at response.data.link
      $.ajax(settings).done(function (response) {
        console.log(response);
        response = JSON.parse(response);
        uploadedImageUrl = response.data.link;
        imageStatus.html("Upload Complete!");
        $("#submit").attr("disabled", false);
      });

    }
  });



  $("#submit").click(() => {

    $("#submit").attr("disabled", true);
    var data = {};

    data.category = $("input[type='radio']:checked").val();
    data.description = $("#summernote").summernote('code');
    data.date = new Date().getTime();
    data.imageUrl = uploadedImageUrl;
    data.headline = $('#heading').val();
    data.source = $("#source-url").val();

    console.log(data);

    db.collection("news").add(data)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert("News added!");
        $("#submit").attr("disabled", false);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });



  });


}

Sammy('#main', function () {

  this.use('Template');

  console.log("sammy running...");

  this.get("#/", function () {
    this.partial("templates/home.template", null, function () {
      console.log("created category!!");
      makeCategories();
      initHome();
      if (screen.width >= 657)
        openNav();
      initFileUpload();
    });

  });

  this.get('#/view-news', function () {

    var context = this;

    db.collection("news")
      .get()
      .then(function (doc) {

        var news = [];
        doc.forEach(function (document) {
          console.log(document.data());
          var obj = document.data();
          obj.id = document.id;
          news.push(obj);
        });


        context.news = news;

        context.partial("templates/view-news.template", null, function () {
          if (screen.width >= 657)
            openNav();
        });

      }).catch(err => {

        console.log(err);

      });


  });
}).run("#/");

function deleteNews(docID) {

  db.collection("news")
    .doc(docID)
    .delete()
    .then(function () {
      alert("Deleted!");
      $("#news-" + docID).remove();
    })
    .catch(function (err) {
      console.log(err);
    });

}