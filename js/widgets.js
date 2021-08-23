let leaves = [$("#leaf-1"), $("#leaf-2"), $("#leaf-3"), $("#leaf-4")];
let expand = true;

function foldLeaves() {
  if (expand) {
    $(".expanded-leaf").addClass("l-folded");
    $(".leaf-content").addClass("l-folded");
    $(".leaf-description").addClass("l-folded");
    $(".control-leaf").removeClass("l-folded");
    expand = false;
  } else {
    $(".leaf-content").removeClass("l-folded");
    $(".expanded-leaf").removeClass("l-folded");
    $(".leaf-description").removeClass("l-folded");
    $(".control-leaf").addClass("l-folded");
    expand = true;
  }

}

$(".control-leaf").click(() => foldLeaves())
