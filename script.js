// // single file upload
// const formSingle = document.getElementById("form-single");

// formSingle.addEventListener("submit", submitFormSingle);

// function submitFormSingle(e) {
//   e.preventDefault();
//   const nameSingle = document.getElementById("name-single");
//   const singleFile = document.getElementById("single-file");
//   const formData = new FormData();
//   formData.append("nameSingle", nameSingle.value);
//   formData.append("singleFile", singleFile.files[0]);

//   fetch("http://localhost:8000/upload_single", {
//     method: "POST",
//     body: formData,
//   })
//     .then((res) => {
//       if (res.ok) {
//         console.log("Successfully uploaded");

//         // Clear the file input
//         singleFile.value = "";
//       } else {
//         console.log("Upload failed", res.statusText);
//       }
//     })
//     .catch((err) => console.log("Error occurred", err));
// }

// // multiple file upload
// const formMultiple = document.getElementById("form-multiple");

// formMultiple.addEventListener("submit", submitFormMultiple);

// function submitFormMultiple(e) {
//   e.preventDefault();
//   const nameMultiple = document.getElementById("name-multiple");
//   const files = document.getElementById("files");
//   const formData = new FormData();
//   formData.append("nameMultiple", nameMultiple.value);
//   for(let i =0; i < files.files.length; i++) {
//           formData.append("files", files.files[i]);
//   }
//   fetch("http://localhost:8000/upload_files", {
//       method: 'POST',
//       body: formData
//   })
//       .then((res) => console.log(res))
//       .catch((err) => console.log("Error occured", err));
// }


// multiple uploads(revision needed for multiple file upload)
const formSingleMultiple = document.getElementById("form-single-multiple");

formSingleMultiple.addEventListener("submit", submitFormSingleMultiple);

function submitFormSingleMultiple(e) {
  e.preventDefault();
  const nameSingleMultiple = document.getElementById("name-single-multiple");
  const singleFile = document.getElementById("single-file");
  const files = document.getElementById("files");
  const formData = new FormData();
  formData.append("nameSingleMultiple", nameSingleMultiple.value);
  formData.append("singleFile", singleFile.files[0]);
  for(let i =0; i < files.files.length; i++) {
          formData.append("files", files.files[i]);
  }
  fetch("http://localhost:8000/upload_multiple", {
      method: 'POST',
      body: formData
  })
      .then((res) => console.log(res))
      .catch((err) => console.log("Error occured", err));
}

const formVideo = document.getElementById("form-video");

formVideo.addEventListener("submit", submitFormVideo);

function submitFormVideo(e) {
  e.preventDefault();
  const video = document.getElementById("video");
  const formData = new FormData();
  formData.append("video", video.files[0]);
  fetch("http://localhost:8000/upload_video", {
      method: 'POST',
      body: formData
  })
      .then((res) => console.log(res))
      .catch((err) => console.log("Error occured", err));
}