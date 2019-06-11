let doc = document;
let sendButton = doc.getElementById("sendComment");
let form = doc.getElementById("addCommentForm");

sendButton.onclick = function(){
    this.disabled = true;
    this.innerText = "Sending...";
    console.log(this.value);
    form.submit();

}