const formBtn = document.querySelector(".formBtn2")

const img = document.querySelector("#img")
const date = document.querySelector("#Date")
const name1 = document.querySelector("#Name")



formBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    const obj = {
        img: img.value,
        date: date.value,
        name: name1.value
    }
    fetch("http://localhost:3000/data", {

        method: "Post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })

})

