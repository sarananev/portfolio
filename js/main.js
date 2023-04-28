'use strict'; {

  // ハンバーガーメニューの実装
  const hambergerMenu = document.querySelector('.hamberger-menu');
  const SP_menu = document.querySelector('.sp-menu');
  
  hambergerMenu.addEventListener('click', () => {
    hambergerMenu.classList.toggle('active');
    SP_menu.classList.toggle('active');
  });
  SP_menu.addEventListener('click', () => {
    hambergerMenu.classList.toggle('active');
    SP_menu.classList.remove('active');
  });

// フェードインの実装
const fadeinTargets = document.querySelectorAll('.fade-in');
  window.addEventListener('scroll', () => {
    fadeinTargets.forEach((fadeinTarget) => {
      const rect = fadeinTarget.getBoundingClientRect().top;
      const scroll = window.pageYOffset || document.documentElement.scrollTop;
      const offset = rect + scroll;
      const windowHeight = window.innerHeight;
      if (scroll > offset - windowHeight + 150){
        fadeinTarget.classList.add('scroll-in');
      }
    });
  });

  // header scroll
window.addEventListener('DOMContentLoaded', () => {
  const Header = document.getElementById('header');
  const Intersect = document.querySelector('.scroll');

  const doWhenIntersect = entries => {
    Header.setAttribute('fixed', String(!entries[0].isIntersecting));
  }
  const observer = new IntersectionObserver(doWhenIntersect, {});
  observer.observe(Intersect);
});

// swiperの実装
const swiper = new Swiper('.swiper', {
  slidePerView: 1,
  // spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  loopAdditionalSlides: 1,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

// ページネーションの実装
const contents = document.querySelector('.grid');
const redraw_elements = document.querySelectorAll('.grid > div');

const total_el = document.querySelector('.total_counter');
const page_counter = document.querySelector('.page_counter');
const prev_btn = document.querySelector('.prev');
const next_btn = document.querySelector('.next');
const count = 9;

let current_step;
let index_start;
let index_end;

function split_page(current_step_update) {
  total_step = Math.ceil(redraw_elements.length / count);
  if(current_step_update === undefined || current_step === 1) {
    current_step = 1;
    next_btn_disable(); prev_btn_active();
  } else if(current_step_update === total_step){
    next_btn_active(); prev_btn_disable();
  } else {
    current_step = current_step_update;
    next_btn_disable(); prev_btn_disable();
    console.log(current_step);
  }

  total_el.textContent = current_step + '/' + total_step;
  redraw(redraw_elements.length, total_step, current_step, count);

  // DOMの描画
function redraw(total, total_step, current_step, count)
{
    // 現在の表示indexを割り出す
    index_start = current_step * count - count;
    index_end = current_step * count - 1;
    let index_array = [];
    for (let i = index_start; i < index_end + 1; i++) {
        index_array.push(i);
    }

    // 一時削除
    while( contents.lastChild ) {
        contents.lastChild.remove();
    }

    // 再描画
    redraw_elements.forEach((element, index) => {
        if(index_array.indexOf(index) != -1) {
            contents.appendChild(element);
        }
    });
}


// ページカウンターの作成
function create_page_counter()
{
    for (let i = 1; i < Math.ceil(redraw_elements.length / count) + 1; i++) {
        let count_list = document.createElement('li');
        count_list.setAttribute('data-counter-id', i);
        count_list.classList.add('page_number');
        count_list.textContent = i;
        page_counter.appendChild(count_list);
    }
}


// イベント処理
next_btn.addEventListener('click', () => {
    split_page(current_step += 1);
});

prev_btn.addEventListener('click', () => {
    split_page(current_step -= 1);
});


// class付与・削除関数
prev_btn_active = () => {
    prev_btn.classList.add('disable');
}
prev_btn_disable = () => {
    prev_btn.classList.remove('disable');
}
next_btn_disable = () => {
    next_btn.classList.remove('disable');
}
next_btn_active = () => {
    next_btn.classList.add('disable');
}


// DOMの構築が完了したタイミングでページネーション発火
window.addEventListener('DOMContentLoaded', () => {
    split_page();
    create_page_counter();
    document.querySelectorAll('.page_number').forEach((element, index) => {
        element.addEventListener('click', function(e) {
            current_step = Number(element.getAttribute('data-counter-id'));
            split_page(current_step);
        })
    });
})



  
  
}




  

}  
