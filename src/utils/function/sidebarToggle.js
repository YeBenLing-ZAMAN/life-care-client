const li = document.querySelectorAll(".life_care_project_sidebar_menu_list");
for (const box of li) {
  box.onclick = activeLi;
}

function activeLi(){
  const list = Array.from(li);
  list.forEach(e=>e.classList.remove("active"));
  this.classList.add("active")
}