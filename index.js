  var $lunbo = (function () {
  //轮播图前端页面
  var div = $(
        '<div class="slider" id="slider">'
      + '<div class="slide">'
      + '<img src="img/b5.png" alt="">'
      + '</div>'
      + '<div class="slide">'
      + '<img src="img/b1.png" alt="">'
      + '</div>'
      + '<div class="slide">'
      + '<img src="img/b2.png" alt="">'
      + '</div>'
      + '<div class="slide">'
      + '<img src="img/b3.png" alt="">'
      + '</div>'
      + '<div class="slide">'
      + '<img src="img/b4.png" alt="">'
      + '</div>'
      + '<div class="slide">'
      + '<img src="img/b5.png" alt="">'
      + '</div>'
      + '<div class="slide">'
      + '<img src="img/b1.png" alt="">'
      + '</div>'
      + '</div>'
      + '<span id="left">' + '<' + '</span>'
      + '<span id="right">'+'>'+'</span>'
      + '<ul class="nav" id="navs">'
      + '<li class="active">1</li>'
      + '<li>2</li>'
      + '<li>3</li>'
      + '<li>4</li>'
      + '<li>5</li>'
      + '</ul>'
  )
    
  var index =1
  function all() {
      var box = $('#box');
      box.append(div);
      var onload, During;
      var flag=true;  
      var slider = document.getElementById('slider'); //放图片的盒子
      var left = document.getElementById('left');
      var right = document.getElementById('right');
      var nums = document.getElementById('navs').children; //圆圈数字
      //样式获取
      function getStyle(element,pseudoElement) {
        if(getComputedStyle(element)){
          return getComputedStyle(element)[pseudoElement];
        }
        else{
          element.currentStyle[pseudoElement];
        }
      }
   
      box.mouseover(function () {
        flag=true;
        if(flag==true){
          left.style.visibility= 'visible';
          right.style.visibility= 'visible';
          left.style.opacity = 0.6;
          right.style.opacity = 0.6;
        }
          clearInterval(onload)
      })
      box.mouseout(function () {
        flag=false;
        if(flag==false){
          left.style.visibility='hidden';
          right.style.visibility='hidden';
        }
        onload = setInterval(next, 2000)
    })
      // left.click(function () {
      // })

      // right.click(function () {
        
      // })
      // 向前
      function front(){
        index=index+1;
        for (var i = 0; i < nums.length; i++) {
          nums[i].className = '';
        };
        if (index == 6) {
            nums[0].className = 'active';
        } else if (index == 0) {
            nums[4].className = 'active';
        } else {
            nums[index - 1].className = 'active';
        }
        Action(10,index, function () {
            if (index == 0) {
                slider.style.left = '-6000px';
                index = 5;
            }
        })
      }
      // 向后
      function next() {
        index=index+1;
        for (var i = 0; i < nums.length; i++) {
            nums[i].className = '';
        };
        if (index == 6) {
            nums[0].className = 'active';
        } else if (index == 0) {
            nums[4].className = 'active';
        } else {
            nums[index - 1].className = 'active';
        }
        Action(10,index, function () {
            if (index == 6) {
                slider.style.left = '-1200px';
                index = 1;
            }
        })
      }
      left.onclick =front;
      right.onclick = next;

      function Action(time,index, callback) {
        clearInterval(During);
        During = setInterval(function () {
            var flag2 = true;
            var width = parseInt(getStyle(slider, 'left'));
            var V= (-1200 * index - width) / 30;
            if(V >0){
                V=Math.ceil(V );
            }else{
                V=Math.floor(V );
            }
            var now = width -10;
            if (-1200 * index !== now+10) {
                flag2 = false;
            }
            slider.style.left = width + V + 'px';
            if (flag2) {
                clearInterval(During)
                callback && callback();
            }
        }, time)
      }
      onload = setInterval(next, 2000)
      for(var i = 0;i<nums.length;i++){
          nums[i].idx = i;
          nums[i].onclick = function(){
              index = this.idx + 1;
              Action(5,index)
              for (var i = 0; i < nums.length; i++) {
                nums[i].className = '';
              };
              if (index == 6) {
                  nums[0].className = 'active';
              } else if (index == 0) {
                  nums[4].className = 'active';
              } else {
                  nums[index - 1].className = 'active';
              }
          }
      }
    }
  // return add;
  return { all: all };
}());