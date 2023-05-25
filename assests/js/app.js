const nav_hamburger = document.querySelector(".nav-hamburger");
const nav_contentBox = document.querySelector(".nav-contentBox");

const blog_cardsBox = document.querySelector(".blog-cardsBox");
const circleBox = document.querySelector(".circleBox");
const DeleteBtn = document.querySelector(".blog-cardBtn")

const searchInput = document.querySelector(".searchInput")
let cricleBoxChildren = circleBox.children;

let mood = true;
nav_hamburger.addEventListener("click", () => {
  nav_contentBox.classList.toggle("active");

  if (nav_contentBox.className != "nav-contentBox") {
    nav_hamburger.innerHTML = `<i class="fa-solid fa-x"></i>`;
    nav_hamburger.children[0].style.color = "black";
    mood = false;
  } else {
    nav_hamburger.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    mood = true;
  }
});

async function klikBtn() {
  await fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((data) => {
      let result = data.length / 3 - 1;

      for (let i = 0; i < result; i++) {
        result * circleAdd();
      }

      for (let i = 0; i < 3; i++) {
        blogData(data[i]);
      }

      for (let i = 0; i < cricleBoxChildren.length; i++) {

        cricleBoxChildren[i].addEventListener("click", (e) => {
          console.log(e.target.id)
          let targetDiv = +e.target.id * 3
          blog_cardsBox.innerHTML = "";
          for (let j = targetDiv; j < targetDiv + 3; j++) {

            console.log(data[j])
            data[j] ? blogData(data[j]) : null;
          }
        });
      }
    });

  for (let i = 0; i < cricleBoxChildren.length; i++) {
    cricleBoxChildren[i].addEventListener("click", () => {
      for (let i = 0; i < cricleBoxChildren.length; i++) {
        cricleBoxChildren[i].classList.remove("activeBtn");
      }
      cricleBoxChildren[i].classList.add("activeBtn");
    });
  }
}
klikBtn();

function circleAdd() {
  const btn = document.createElement("button");

  console.log(circleBox.children)
  btn.id = circleBox.children.length


  circleBox.append(btn);
}

function blogData(data) {
  const blog_card = document.createElement("div");
  const card_imgBox = document.createElement("div");
  const card_img = document.createElement("img");
  const card_content = document.createElement("div");
  const blog_cardData = document.createElement("p");
  const blog_cardName = document.createElement("h2");
  const blog_cardLink = document.createElement("a");
  const blog_cardBtn = document.createElement("button");

  blog_cardData.innerText = data.date;
  blog_cardLink.innerText = data.name;
  card_img.setAttribute("src", data.img);
  blog_cardBtn.innerText = "Delete";
  blog_cardBtn.onclick = () => {
    blog_cardBtn.parentElement.parentElement.remove()
    fetch("http://localhost:3000/data/" + data.id, { method: "delete" })
      .then(res => res.json())
      .then(
        fetch("http://localhost:3000/data/", {
          method: "Get",
        })
          .then(res => res.json)
          .then(
            blogData()

          )
      )
  }


  card_imgBox.classList.add("card-imgBox");
  card_img.classList.add("card-img");
  blog_card.classList.add("blog-card");
  card_content.classList.add("card-content");
  blog_cardData.classList.add("card-dateText");
  blog_cardName.classList.add("card-nameText");
  blog_cardBtn.classList.add("blog-cardBtn")


  blog_cardName.append(blog_cardLink);
  card_content.append(blog_cardData, blog_cardName, blog_cardBtn);
  card_imgBox.append(card_img);
  blog_card.append(card_imgBox, card_content);

  blog_cardsBox.append(blog_card);


  searchInput.addEventListener("keyup", (e) => {
    e.preventDefault()
    console.log(data);
    for (let i = 0; i < data.length; i++) {

      if (searchInput.value.toLowerCase() !== blog_cardLink.innerText.toLowerCase()) {
        data[i].style.display = "none"
      }

    }

  })
}



