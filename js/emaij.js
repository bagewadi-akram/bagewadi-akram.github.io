let templateParams = {
  name: document.getElementById("yourname").value,
  email: document.getElementById("youremail").value,
  phone: document.getElementById("phone_number").value,
};
console.log("templateParams :>> ", templateParams);

// emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", "#myForm").then(
//   function (response) {
//     console.log("SUCCESS!", response.status, response.text);
//   },
//   function (error) {
//     console.log("FAILED...", error);
//   }
// );
function sendemail() {
  emailjs
    .send(
      "service_iaxjywh",
      "template_m3ozcsb",
      templateParams,
      "-0cgcNdkjRzXNGe-V"
    )
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
}
