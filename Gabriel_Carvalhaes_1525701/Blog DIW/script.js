const nameText = document.querySelector(".")
const urlfetch = ""
const reposfetch = ""
window.onload = function() {
    fetch(urlfetch).then(res => {
        return res.json()
    })then (data => {
        console.log(data)
        nameText.texContent = data.login
    })
}
