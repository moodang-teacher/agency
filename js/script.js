$(function () {
  gsap.registerPlugin(ScrollTrigger);

  // 전체 애니메이션 관련 초기 (전역) 설정
  gsap.defaults({ duration: 0.7, ease: 'bouce.out' });

  const video = $('.visual video').get(0);

  $(window).on('scroll', () => {
    let scrollTop = $(this).scrollTop();
    if (scrollTop === 0) video.play();
  });

  // visual영역 애니메이션 구현
  // const visualTL = gsap.timeline({ defaults: { duration: 1, ease: 'none' } });
  const visualTL = gsap.timeline();
  visualTL.from(video, { scale: 3, duration: 3, filter: 'blur(30px)' });
  visualTL.from('.logo', { autoAlpha: 0, y: -30, ease: 'power4.inOut' });
  visualTL.from('.gnb li', { autoAlpha: 0, y: -30, ease: 'power4.inOut', stagger: 0.2 });
  visualTL.from('.util', { autoAlpha: 0, y: -30, ease: 'power4.inOut' }, '-=0.4');

  visualTL.from('.visual-title h2 strong', { y: 100 });
  visualTL.from('.visual-title p', { autoAlpha: 0, y: 100 }, '-=0.3');
  visualTL.from('.visual-title .btn-cta', { autoAlpha: 0, y: 100 }, '-=0.3');

  // About us 영역 애니메이션 구현
  const aboutTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.about',
      // markers: true,
      start: '0% 50%',
      onEnter: () => video.pause(),
    },
  });

  // aboutTL.from('.about figure', { rotateY: 90, transformOrigin: '0 0' });
  aboutTL.from('.about figure', { clipPath: 'inset(0 100% 0 0)' });
  aboutTL.from('.about p', { autoAlpha: 0, x: -50, delay: 1 });

  // Team 영역 애니메이션 구현
  const teamTL = gsap.timeline({
    // 스크롤과 연동
    scrollTrigger: {
      trigger: '.team',
      // markers: true,
      start: '0% 20%',
      end: '100% 0%',
      pin: true,
      scrub: 1,
    },
  });

  teamTL.from('.team-list li figure', {
    autoAlpha: 0,
    rotation: 30,
    y: -100,
    stagger: 0.2,
  });

  teamTL.from(
    '.team-list li dl',
    {
      autoAlpha: 0,
      y: -50,
      stagger: 0.2,
    },
    '<'
  );

  teamTL.to('.team', { backgroundColor: '#222', duration: 3 }, '-=1');

  teamTL.from('.btn-with', { autoAlpha: 0, y: -50 }, '-=0.3');

  // sec-title에 대한 설정
  // 배열로 변환시키는 gsap의 유틸메서드 : .utils.toArray()
  const secTitle = gsap.utils.toArray('.sec-title');
  // console.log(secTitle);

  secTitle.forEach((item) => {
    // gsap.from(item, {
    //   scrollTrigger: {
    //     trigger: item,
    //     markers: true,
    //     start: 'top 70%',
    //   },

    //   autoAlpha: 0,
    //   y: 30,
    // });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          // markers: true,
          start: 'top 70%',
        },
      })
      .from(item, { autoAlpha: 0, y: 30 });
  });

  // work 애니메이션
  const workImg = gsap.utils.toArray('.work-con img');
  console.log(workImg);
  workImg.forEach((item, index) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: '0% 50%',
          end: '100% 0',
          // markers: true,
        },
      })
      .from(item, {
        x: -30,
        autoAlpha: 0,
        delay: index * 0.2,
      });
  });
});
