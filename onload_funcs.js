const playButtonBehaviour = (player) => {
  let video = player.querySelector('video');
  let playBtn = player.querySelector('.play-btn');
  playBtn.addEventListener("click", () => {
    video[video.paused ? 'play' : 'pause']();
    let icon = playBtn.querySelector('i');
    icon.innerText = video.paused ? 'play_arrow': 'pause';
  });
};


const addLeadingZero = (numString) => {
  return numString.length === 1? ('0' + numString): numString;
};


const displayTimeDuration = (durationSeconds) => {
  let hours = Math.floor(durationSeconds / 60 / 60);
  let minutes = Math.floor(durationSeconds / 60);
  let seconds = Math.round(durationSeconds % 60);

  let h = hours.toString();
  let m = minutes.toString();
  let s = addLeadingZero(seconds.toString());

  return hours === 0 ? (m + ':' + s) : (h + ':' + addLeadingZero(m) + ':' + s);
};


const displayTime = (player) => {
  let video = player.querySelector('video');
  let timeDuration = player.querySelector('.time-duration');
  timeDuration.innerText = displayTimeDuration(video.duration);

  let currentTime = player.querySelector('.time-current');
  video.addEventListener('timeupdate', (event) => {
    currentTime.innerText = displayTimeDuration(video.currentTime);
  });
};


const skipButtonsBehaviour = (player) => {
  let video = player.querySelector('video');
  let btns = player.querySelectorAll('.skip-btn');
  btns.forEach(button => {
    button.addEventListener('click', () => {
      let skipTime = player.querySelector('.skip-time').value;
      video.currentTime += (parseFloat(button.dataset.skip) * skipTime);
    });
  });
};


const progression = (player) => {
  let video = player.querySelector('video');
  video.addEventListener('timeupdate', () => {
    // let progressBarFilled = player.querySelector('.progress-filled');
    let slider = player.querySelector('.progress-bar');
    // const percent = (video.currentTime / video.duration) * 100;
    slider.value = (video.currentTime / video.duration) * 100;
    // progressBarFilled.style.flexBasis = `${percent}%`;
  });
};


// const openMenu = (player) => {
//   const menu = player.querySelector('.settings-btn');
//   menu.style.rotate = 90;
// };


function changePlayBackRate(player) {
  const i = player.querySelector('.playback-rate-input');
  const out = player.querySelector('.playback-rate-display');
  const video = player.querySelector('video');
  i.addEventListener('input', () => {
    video.playbackRate = i.value;
    out.innerText = i.value;
  });
};


function changeSize(player) {
  const i = player.querySelector('.size-input');
  const video = player.querySelector('video');
  i.addEventListener('input', () => {
    let numberPixels = i.value;
    // let frameHeight = (i.value * (405/720)).toString() + "px";
    let frameWidth = numberPixels.toString() + "px";
    video.style.width = frameWidth;
    // video.style.height = frameHeight;
  });
};


function openMenu(player) {
  const menu = player.querySelector('.settings-options');
  const btn = player.querySelector('.settings-btn');
  btn.addEventListener('click', () => {
    menu.style.display === 'flex'? menu.style.display = 'none' : menu.style.display = 'flex';
    btn.style.rotate += '90deg';
  });
};


function dropdownList(player) {
  if (player.querySelector('.bookmarks')) {  // executes only if class exists
    const bookmarks = player.querySelector('.bookmarks-list');
    const btn = player.querySelector('.button-dropdown');
    const icon = player.querySelector('.fa-angle-down');
    btn.addEventListener('click', () => {
      bookmarks.style.display === 'block' ? bookmarks.style.display = 'none' : bookmarks.style.display = 'block';
      icon.className === "fa fa-angle-down" ? icon.className = 'fa fa-angle-up' : icon.className = "fa fa-angle-down";
    });
  };
};


function convertToTime(lst) {
  return lst[0] * 60 * 60 + lst[1] * 60 + lst[2];
};


function clickBookmark(player) {
  const allBookmarksBtns = player.querySelectorAll('.bookmark-btn');
  const video = player.querySelector('video');

  Array.from(allBookmarksBtns).forEach((btn, i) => {
    let timesFromBtn = btn.innerText.split(':').map(function (nb) {
      return parseInt(nb);
    });
    let newTime = convertToTime(timesFromBtn);
    btn.addEventListener('click', () => {
      video.currentTime = newTime;
      video.play();
    });
  });
};


// ONLOAD FUNCTIONS
window.onload = function () {
  let i = 0;
  let videoPlayers = document.getElementsByClassName('video-player');

  Array.from(videoPlayers).forEach((videoPlayer, i) => {
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Video_player_styling_basics
    // https://github.com/iandevlin/iandevlin.github.io/tree/master/mdn/video-player-styled
    // https://github.com/alexanderanter/JavaScript30/tree/master/11-CustomVideoPlayer
    // playButtonBehaviour(videoPlayer);
    // displayTime(videoPlayer);
    skipButtonsBehaviour(videoPlayer);
    // progression(videoPlayer);
    openMenu(videoPlayer);
    changePlayBackRate(videoPlayer);
    changeSize(videoPlayer);
    dropdownList(videoPlayer);
    clickBookmark(videoPlayer);
  });



  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let dropdown_syllabus_btns = document.getElementsByClassName('dropdown_syllabus_btn');
  let dropdown_syllabus_lists = document.getElementsByClassName('dropdown_syllabus_list');
  i = 0;

  Array.from(dropdown_syllabus_btns).forEach((item, i) => {
    // item == button.dropdown_syllabus_btn
    item.addEventListener("click", () => {
      if (dropdown_syllabus_lists[i].style.display === "") {
        dropdown_syllabus_lists[i].style.display = "block";
        item.innerHTML = "Roll up <span class='fa fa-angle-up'></span>"
      } else {
        dropdown_syllabus_lists[i].style.display = "";
        item.innerHTML = "Drop down <span class='fa fa-angle-down'></span>"
      } // end if
    }); // end event listener
  }); // end Array
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let tabs = document.getElementsByTagName('TABLE');
  let hiddentabs = document.getElementsByClassName('hidden');
  let dropdownbuttons = document.getElementsByClassName('dropdowntable');
  i = 0;

  Array.from(dropdownbuttons).forEach((item, i) => {
    item.addEventListener("click", function () {
      if (item.nextElementSibling.style.display === "") {
        item.nextElementSibling.style.display = "table";
        item.innerText = "Roll up";
        item.style.backgroundColor = "#d34179";
      } else {
        item.nextElementSibling.style.display = "";
        item.innerText = "Dropdown";
        item.style.backgroundColor = "#282c34";
      }  //end if
    }); // end event listener
  });  // end Array
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // to change PLAYBACK RATE of videos
  let videoDivs = document.getElementsByClassName("vwrap");
  let playbackRateDisplay = document.getElementsByClassName('pbrDisplay');
  let playbackRateBars = document.getElementsByClassName('pbrBar');
  i = 0;

  Array.from(playbackRateBars).forEach((item, i) => {
    item.addEventListener("input", function(){
      playbackRateDisplay[i].innerText = item.value;
      videoDivs[i].firstElementChild.playbackRate = item.value; // video
    }); // end addEventListener
  });  // end Array loop
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // to RESIZE videos
  let viframes = document.getElementsByClassName("viframe");
  let sizeBars = document.getElementsByClassName("sizeBar");

  Array.from(sizeBars).forEach((item, i) => {
      item.addEventListener("input", function(){
        let numberPixels = item.value;
        let frameHeight = (item.value * (405/720)).toString() + "px";
        let frameWidth = numberPixels.toString() + "px";
        item.previousElementSibling.style.width = frameWidth;
        item.previousElementSibling.style.height = frameHeight;
      }); // end event listener
  }); // end array
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let videoDivs2 = document.getElementsByClassName("vwrap2");
  let playbackRateBars2 = document.getElementsByClassName('pbrBar2');
  let sizeBars2 = document.getElementsByClassName('sizeBar2');
  i = 0;

  Array.from(playbackRateBars2).forEach((item, i) => {
    item.addEventListener("input", function(){
      let video_ = videoDivs2[i].firstElementChild;
      video_.playbackRate = item.value;
    }); // end event listener
  });  // end Array loop

  Array.from(sizeBars2).forEach((item, i) => {
    item.addEventListener("input", function(){
      let video_ = videoDivs2[i].firstElementChild;
      let numberPixels = item.value;
      let frameWidth = numberPixels.toString() + "px";
      video_.style.width = frameWidth;
    }); // end event listener
  });  // end Array loop
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let playlistViframes = document.getElementsByClassName("piframe");
  let playlistSizeBars = document.getElementsByClassName("playlist_size_bar");
  let desc_containers = document.getElementsByClassName("desc_container");
  let playlist_item_contents = document.getElementsByClassName("playlist_item_content");
  i = 0;

  Array.from(playlistSizeBars).forEach((item, i) => {
      item.addEventListener("input", function(){
        let numberPixels = item.value;
        let frameHeight = (item.value * (405/720)).toString() + "px";
        let frameWidth = numberPixels.toString() + "px";
        playlistViframes[i].style.width = frameWidth;
        playlistViframes[i].style.height = frameHeight;
        playlist_item_contents[i].style.display = 'grid';
        if (desc_containers[i].offsetWidth < 400) {
          playlist_item_contents[i].style.display = 'block';
          playlistViframes[i].style.margin = 'auto';
        } else {
          playlist_item_contents[i].style.display = 'grid';
        } // end if
      }); // end event listener
  }); // end array
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  let time_bookmarks = document.getElementsByClassName('time_bookmarks');
  // let time_bookmarks = document.getElementsByClassName('time_bookmark');
  // let all_videos = document.getElementsByTagName('video');
  // to finish
  i = 0;

  Array.from(time_bookmarks).forEach((item, i) => {
    // the item is a div.time_bookmarks
    let video_ = item.parentElement.previousElementSibling.previousElementSibling;
    // let timer = video_.currentTime;
    let bookmark_buttons = item.getElementsByClassName('time_bookmark');
    let i2 = 0
    Array.from(bookmark_buttons).forEach((item2, i2) => {
      // item2 is button.time_bookmark
      let btn_text_list = item2.innerText.split(':');
      let time_t = parseInt(btn_text_list[0])*60*60 + parseInt(btn_text_list[1])*60 + parseInt(btn_text_list[2]);

      item2.addEventListener("click", function(){
        video_.currentTime = time_t;
        video_.play();
      }); // end event listener
    }); // end Array
  }); //end Array
};  // end window onload function

$(document).ready(function toc_builder(){
  // Get all the immediate children
  let children = $("#toc-container").children(".toc-item");
  let html_ = "";

  let conditions = ["Chapter", "Appendix"];

  function write_toc(s, item, conditions, i) {
    if (conditions.some(el => $(item).html().includes(el))) { // if it is a Chapter or an Appendix in the HTML document
      s += "<li class=\"list-group-item\" style=\"font-size:1em;color:#8e44ad;\"><a href=\"#toc-item-" + i + "\"><b>" + $(item).html() + "</b></a></li>";
    } else if ($(item).html().includes("Section") === true) {
      s += "<li class=\"list-group-item\" style=\"font-size:0.9em;\"><a href=\"#toc-item-" + i + "\"><b>" + $(item).html() + "</b></a></li>";
    } else {
      s += "<li class=\"list-group-item\" style=\"font-size:0.8em;\"><a href=\"#toc-item-" + i + "\"><i>" + $(item).html() + "</i></a></li>";
    } // end if
    return s;
  }

  for (let i = 0; i < children.length; i++) {
    $(children[i]).prop("id", "toc-item-" + i);
    if (children.length === 1) {  // if there is only 1 item => no sub-lists
      html_ = write_toc(html_, children[i], conditions, i);
      // if there are > 1 item
    } else if (i === 0) {  // first item
      if (conditions.some(el => $(children[i]).html().includes(el)) && !conditions.some(el => $(children[i+1]).html().includes(el))) { // first item is a Chapter or an Appendix that is not followed by a Chapter or an Appendix
        html_ += "<li class=\"list-group-item\" style=\"font-size:1em;\"><a href=\"#toc-item-" + i + "\" style=\"color:#ffc844;\"><b>" + $(children[i]).html() + "</b></a></li><ul>";
      } else if (conditions.some(el => $(children[i]).html().includes(el)) && conditions.some(el => $(children[i+1]).html().includes(el))) { // first item is a Chapter or an Appendix followed by a Chapter or an Appendix
        html_ += "<li class=\"list-group-item\" style=\"font-size:1em;\"><a href=\"#toc-item-" + i + "\" style=\"color:#ffc844;\"><b>" + $(children[i]).html() + "</b></a></li>";
      } else { // if first item is a Chapter or an Appendix
        html_ = write_toc(html_, children[i], conditions, i);
      }
    } else if (i === children.length-1) {  // last item
      if (conditions.some(el => $(children[i]).html().includes(el)) && !conditions.some(el => $(children[i-1]).html().includes(el))) { // first item is a Chapter or an Appendix that is not preceded by a Chapter or an Appendix
        html_ += "</ul><li class=\"list-group-item\" style=\"font-size:1em;\"><a href=\"#toc-item-" + i + "\" style=\"color:#ffc844;\"><b>" + $(children[i]).html() + "</b></a></li>";
      } else if (conditions.some(el => $(children[i]).html().includes(el)) && conditions.some(el => $(children[i-1]).html().includes(el))) { // first item is a Chapter or an Appendix preceded by a Chapter or an Appendix
        html_ += "<li class=\"list-group-item\" style=\"font-size:1em;\"><a href=\"#toc-item-" + i + "\" style=\"color:#ffc844;\"><b>" + $(children[i]).html() + "</b></a></li>";
      } else { // if first item is a Chapter or an Appendix
        html_ = write_toc(html_, children[i], conditions, i);
      }
    }
    else {
      if (conditions.some(el => $(children[i]).html().includes(el)) && !conditions.some(el => $(children[i-1]).html().includes(el)) && !conditions.some(el => $(children[i+1]).html().includes(el))) {
        html_ += "</ul><li class=\"list-group-item\" style=\"font-size:1em;\"><a href=\"#toc-item-" + i + "\" style=\"color:#ffc844;\"><b>" + $(children[i]).html() + "</b></a></li><ul>";
      } else if (conditions.some(el => $(children[i]).html().includes(el)) && conditions.some(el => $(children[i-1]).html().includes(el)) && !conditions.some(el => $(children[i+1]).html().includes(el))) {
        html_ += "<li class=\"list-group-item\" style=\"font-size:1em;\"><a href=\"#toc-item-" + i + "\" style=\"color:#ffc844;\"><b>" + $(children[i]).html() + "</b></a></li><ul>";
      } else if (conditions.some(el => $(children[i]).html().includes(el)) && !conditions.some(el => $(children[i-1]).html().includes(el)) && conditions.some(el => $(children[i+1]).html().includes(el))) {
        html_ += "</ul><li class=\"list-group-item\" style=\"font-size:1em;color:#ffc844;\"><a href=\"#toc-item-" + i + "\" style=\"color:#ffc844;\"><b>" + $(children[i]).html() + "</b></a></li>";
      } else {
        html_ = write_toc(html_, children[i], conditions, i);
        } // end if
      } // end if
  }; // end for

  $("#toc-main").html(html_);
}); // end toc_builder
