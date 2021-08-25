let leaves = [$("#leaf-1"), $("#leaf-2"), $("#leaf-3"), $("#leaf-4")];
let expand = true;

let l2Text = ["暂停播放", "继续播放"];
let l2Img = ["assets/pause.svg", "assets/continue.svg"];
let l3Text = ["禁止重叠", "重叠播放"];
let l3Img = ["assets/non-overlapping.svg", "assets/overlapping.svg"];
let l4Text = ["禁止循环", "洗脑循环", "随机循环"];
let l4Img = ["assets/no-loop.svg", "assets/loop.svg", "assets/random.svg"];
let l4Mode = ["no-loop", "loop", "random"];
let l2Counter = 0;
let l3Counter = 0;
let l4Counter = 0;

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

$(".control-leaf").click(() => foldLeaves());

$(".l-2").click(() => {
  l2Counter++;
  $(".l-2.leaf-content").attr("src", l2Img[l2Counter % 2]);
  $(".l-2.leaf-description").text(l2Text[l2Counter % 2]);

  if (l2Counter % 2 == 1) player.pause();
  else player.continue();
});

$(".l-3").click(() => {
  l3Counter++;
  $(".l-3.leaf-content").attr("src", l3Img[l3Counter % 2]);
  $(".l-3.leaf-description").text(l3Text[l3Counter % 2]);
  player.setMode(l4Mode[l4Counter % 3], l3Counter % 2 == 1);
});

$(".l-4").click(() => {
  l4Counter++;
  $(".l-4.leaf-content").attr("src", l4Img[l4Counter % 3]);
  $(".l-4.leaf-description").text(l4Text[l4Counter % 3]);
  player.setMode(l4Mode[l4Counter % 3], l3Counter % 2 == 1);
});

$(".l-5").click(() => {
  player.playRandom();
});
