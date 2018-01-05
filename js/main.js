//Мобильный хедер
var mobile_show = document.querySelector(".mobile-header-show");
var mobile_header = document.querySelector(".header-menu");
var overlay = document.querySelector(".overlay");

if(mobile_show) {
  mobile_show.addEventListener("click", function() {
    if(mobile_header.classList.contains("fixed")) {
      mobile_show.classList.remove("active");
      mobile_header.classList.remove("fixed", "slideInDown");
      overlay.classList.remove("show");
    } else {
      mobile_show.classList.add("active");
      mobile_header.classList.add("fixed", "slideInDown");
      overlay.classList.add("show");
    }
  })
}

// Плавающий асайд
var open_aside = document.querySelector(".btn-open-aside");
var aside = document.querySelector(".aside-nav");
var close_aside = document.querySelector(".close-aside");

open_aside.addEventListener("click", function(event){
  event.preventDefault();
  open_aside.classList.toggle("show");
  aside.classList.toggle("show");
})

close_aside.addEventListener("click", function(event) {
  event.preventDefault();
  aside.classList.remove("show");
  open_aside.classList.remove("show");
})



// Слайдер на главной
var slider_index = document.querySelector(".main-slider");

if(slider_index) {
  var slides_node = document.querySelectorAll(".slide");
  var slides_arr = [slides_node.length];
  var buttons = [slides_arr.length];
  var btn_prev = document.querySelector(".slider-prev");
  var btn_next = document.querySelector(".slider-next");
  var start = 0;

  for(var i = 0; i < slides_node.length; i++) {
    slides_arr[i] = slides_node.item(i);
    slides_arr[i].classList.remove("current");
  };

   slides_arr[0].classList.add("current");


  btn_prev.addEventListener("click", function(event) {
    for(var i = 0; i < slides_arr.length; i++) {
      if(slides_arr[i].classList.contains("current")) {
        slides_arr[i].classList.remove("current");
        buttons[i].classList.remove("current");
        if(i === 0) {
          slides_arr[slides_arr.length-1].classList.add("current");
          buttons[slides_arr.length-1].classList.add("current");
          break;
        } else {
          slides_arr[i-1].classList.add("current");
          buttons[i-1].classList.add("current");
          start = i-1;
          clearInterval(timer);
          slider_time_press(start);
        }
      }
    }
  });

  btn_next.addEventListener("click", function(event) {
    for(var i = 0; i < slides_arr.length; i++) {
      if(slides_arr[i].classList.contains("current")) {
        slides_arr[i].classList.remove("current");
        buttons[i].classList.remove("current");
        if(i === slides_arr.length - 1) {
          slides_arr[0].classList.add("current");
          buttons[0].classList.add("current");
        } else {
          slides_arr[i+1].classList.add("current");
          buttons[i+1].classList.add("current");
          start = i+1;
          clearInterval(timer);
          slider_time_press(start);
        }
        break;
      }
    }
  });

  function add_buttons() {
    for(var i = 0; i < slides_arr.length; i++) {
      buttons[i] = document.createElement("button");
      buttons[i].className = "btn-slider animated fadeIn";
      if(i === 0) {
        buttons[i].className = "btn-slider current";  
      }
      buttons[i].innerHTML = i+1;
      document.querySelector(".btns-slider").appendChild(buttons[i]);
    }
  };

  function slides(slides_arr, i, buttons) {
    var status = true;
    if(i === slides_arr.length) {
      i -= 1;
    }
    if(i === -1) {
      i += 1;
    }
    if(slides_arr[i].classList.contains("current")) { // Если  у  данного элемента есть класс active
      slides_arr[i].classList.remove("current"); // то удаляем его
      buttons[i].classList.remove("current");
      var next_i = i + 1; // создаём переменную, в  которой храним номер элемента, которому будет присвоем класс active
      if(next_i > slides_arr.length-1) { // Если выходит за границы массива, то обнуляем
        next_i = 0;
      }
      slides_arr[next_i].classList.add("current"); // Добавляем класс Active    
      buttons[next_i].classList.add("current");
      status = false;
      return status;
    }
    return status;
  };

  add_buttons();      

  slider_index.addEventListener("click", function(event) {
    if(event.target.nodeName == "BUTTON") {
      console.log("nana");
      var press_i = event.target.textContent-1;
      console.log(press_i);
      start = press_i;
      clearInterval(timer);
      slider_time_press(start);
    } 
  });

  function slider_time(start) {
    timer = setInterval(function() {
      for(var i = start; i < slides_arr.length; i++) {
        if(!slides(slides_arr, i, buttons)) {
          break;
        }
      }
    }, 7000);
    start = 0;
  };

  slider_time(start);

  function slides_press(slides_arr, i, buttons) {
    var status = true;
    for(var y = 0; y < slides_arr.length; y++) {
      if(slides_arr[y].classList.contains("current")) {
        slides_arr[y].classList.remove("current");   
        buttons[y].classList.remove("current");
      }
    }

    if(i === slides_arr.length) {
      i -= 1;
    }
    if(i === -1) {
      i += 1;
    }

    slides_arr[i].classList.add("current");  
    buttons[i].classList.add("current");
    return status;
  };

  function slider_time_press(start) {
    for(var i = start; i < slides_arr.length; i++) {
      if(slides_press(slides_arr, i, buttons)) {
        break;
      }
    }
    slider_time(start);
  };

}

/* Слайдер на карте товара */
var product_slider = document.querySelector(".cart-block-slider");

if(product_slider) {
  var main_images_node = product_slider.querySelectorAll(".big-img");
  var main_imgaes = [main_images_node.length];
  var small_images_node = product_slider.querySelectorAll(".small-img");
  var small_images = [small_images_node.length];
  var prev = product_slider.querySelector(".slider-prev");
  var next = product_slider.querySelector(".slider-next");
  var overlay = document.querySelector(".overlay");
  
  for (var i = 0; i < main_images_node.length; i++) {
    main_imgaes[i] = main_images_node.item(i);
    small_images[i] = small_images_node.item(i);
  }
  
  for(var i = 0; i < small_images.length; i++) {
    small_images[i].classList.remove("show");
  }
  
  for(var i = 0; i < small_images.length; i++) {
    if(i < 3) {
      small_images[i].classList.add("show");
    }
  }
  
  prev.addEventListener("click", function(event) {
    var last;
    for(var i = 0; i < small_images.length; i++) {
      if(small_images[i].classList.contains("show")) {
        last = i;
      }
    }
    i = last;
    if((i-3) < 0) {
    } else {
      small_images[i].classList.remove("show")
      small_images[i-3].classList.add("show")
    }
    var last_curr;
    for(var y = 0; y < small_images.length; y++) {
      if(small_images[y].classList.contains("current-js")) {
        last_curr = y;
      }
    }
    y = last_curr;
    if(y > 0) {
      small_images[y].classList.remove("current-js");
      small_images[y-1].classList.add("current-js");        
      for(var i = 0; i < main_imgaes.length; i++) {
        main_imgaes[i].classList.remove("show");
      }
      main_imgaes[y-1].classList.add("show");
    }
  });

  next.addEventListener("click", function(event) {  
    for(var i = 0; i < small_images.length; i++) {
      if(small_images[i].classList.contains("show")) {
        break;
      }
    }        
    if((i+3) >= small_images.length) {
    } else {
      small_images[i].classList.remove("show");
      small_images[i+3].classList.add("show");
    }
    for(var y = 0; y < small_images.length; y++) {
      if(small_images[y].classList.contains("current-js")) {
        break;
      }
    }
    if((y + 1) < small_images.length) {
      for(var i = 0; i < main_imgaes.length; i++) {
        main_imgaes[i].classList.remove("show");
      }
      small_images[y].classList.remove("current-js");
      small_images[y+1].classList.add("current-js");
      main_imgaes[y+1].classList.add("show");
    }
  });
  
  small_images.forEach(function(item, i, small_img_arr) { //Кликалка по маленьким картинкам
    small_images[i].addEventListener("click", function(event){
      for(var y = 0; y < small_images.length; y++) {
        if(small_images[y].classList.contains("current-js")) {
          small_images[y].classList.remove("current-js");
        }
      }
      small_images[i].classList.add("current-js");
      for(var y = 0; y < main_imgaes.length; y++) {
        main_imgaes[y].classList.remove("show");
      }
      main_imgaes[i].classList.add("show");
    })
  })
  
  main_imgaes.forEach(function(item, i, main_imgaes) {
    main_imgaes[i].addEventListener("click", function(event) {
      event.preventDefault();
      var image = overlay.childNodes.item(0);
      if(image) {
        overlay.removeChild(image);            
      }
      img = document.createElement('img');
      imgHref = main_imgaes[i].getAttribute('href');
      img.setAttribute('src', imgHref);
      img.classList.add("zoom-img");
      overlay.classList.add("show");
      overlay.appendChild(img);
      if(overlay.classList.contains("show")) {
        overlay.addEventListener("click", function() {
          image = overlay.childNodes.item(0);
          if(image) {
            overlay.removeChild(image);            
          }   
          overlay.classList.remove("show");
        })
      }
    })
  }) 
}