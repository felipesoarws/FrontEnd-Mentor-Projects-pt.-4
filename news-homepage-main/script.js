const menu_mobile_icon = document.querySelector(".menu_mobile_icon");
const menu_mobile_icon_img = document.querySelector(".menu_mobile_icon img");

menu_mobile_icon.addEventListener("click", (e) => {
  if (menu_mobile_icon_img.classList[0] == "closed") {
    openMobMenu();
  } else {
    closeMobMenu();
  }
});

const openMobMenu = () => {
  menu_mobile_icon_img.classList.remove("closed");
  menu_mobile_icon_img.classList.add("open");
  menu_mobile_icon_img.src = "assets/images/icon-menu-close.svg";
};
const closeMobMenu = () => {
  menu_mobile_icon_img.classList.add("closed");
  menu_mobile_icon_img.classList.remove("open");
  menu_mobile_icon_img.src = "assets/images/icon-menu.svg";
};

$(document).ready(function () {
  $(".menu_mobile_icon").click(function () {
    $(this).toggleClass("active");
    $(".menu_mobile").toggleClass("active");
  });
});
