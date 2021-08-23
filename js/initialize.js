var overview;

let originalHeight = 3170;
let originalMid = 1576;
let originalWidth = 356;

async function initialize() {
  overview = await fetch('https://sepeach.com/echo-api/echo/button/overview')
    .then(response => response.json())
    .then(data => { return data.data; })

  var categories;

  categories = overview.reduce((list, i) => {
    list.push(i.button_classification);
    return list;
  }, [])

  console.log(categories)
  categories.forEach((text, idx) => initializeSidebar(text, idx))

  $("#sidebar-0").addClass("list-group-item-active")
  $("#sidebar-0").removeClass("list-group-item")

  initializeSidebarBackground();
  $(window).resize(() => initializeSidebarBackground());
  initializeButtons(0);

  
}

function initializeButtons(idx) {
  $('.tf-btns').empty();
  let btns = overview[idx]['button_list'];
  btns.forEach((btn, idx) => addButton(btn, idx));
}

function addButton(btn, idx) {
  $(".tf-btns").append(
    '<div class="tf-btn"><div class="tf-btn-content">' + 
    btn.voice_name +
    '</div><img src="assets/four.svg" alt="" class="tf-btn-4"></div>'
  )
  if(idx % 10 == 9) {
    $(".tf-btns").append('<div class="dividing-line-main"></div>')
  }
}

function initializeSidebarBackground() {
  // set width
  $("#sidebar-mask-container").css({width: String($("#sidebar-wrapper").width()+10)});
  $("#sidebar-mask-container").css({height: String($("#sidebar-wrapper").height())});
  $("#sidebar-mask").css({width: String($("#sidebar-wrapper").width())});
  let top_px = -$("#sidebar-mask").width() / 356 * originalMid + $(".list-group-item-active>*").offset().top;
  $("#sidebar-mask").css({top: String(top_px)+'px'});
}

function updateSidebarBackground() {
  let top_px = -$("#sidebar-mask").width() / 356 * originalMid + $(".list-group-item-active>*").offset().top;
  $("#sidebar-mask").css({top: String(top_px)+'px'});
}

function initializeSidebar(text, idx) {
  $("#categories").append(
    '<a class="list-group-item li-p" id="sidebar-' + String(idx) + '"href="#!">' +
    '<div class="item-content">' + text + '</div>' +
    '</a><div class="dividing-line-side"></div>'
  )

  $("#sidebar-"+String(idx)).click(() => {
    $(".list-group-item-active").removeClass("list-group-item-active");
    $("#sidebar-"+String(idx)).removeClass("list-group-item");
    $("#sidebar-"+String(idx)).addClass("list-group-item-active");
    initializeButtons(idx);
    updateSidebarBackground();
  });
}

initialize()