function navClick() {
  let navbutton = document.getElementById("nav-button");
  if (navbutton.classList.contains("close-button")) {
    let nav = document.querySelector("nav.close-nav");
    if (navbutton && nav) {
      navbutton.classList.remove("close-button");
      navbutton.classList.add("open-button");
      nav.classList.remove("close-nav");
      nav.classList.add("open-nav");
    } else {
      console.log("Navigation error");
    }
  } else {
    let nav = document.querySelector("nav.open-nav");
    if (navbutton && nav) {
      navbutton.classList.remove("open-button");
      navbutton.classList.add("close-button");
      nav.classList.remove("open-nav");
      nav.classList.add("close-nav");
    } else {
      console.log("Navigation error");
    }
  }
}

document.getElementById("nav-button")?.addEventListener("click", navClick);

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

document.getElementsByClassName("smoothscroll")[0]?.addEventListener("click", scrollToTop);