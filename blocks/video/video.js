function loadFranklinVideo(videoHref, block) {
  block.innerHTML = `<video autoplay loop muted>
    <source src="${videoHref}" type="video/${videoHref.split('.').pop()}" >
  </video>`;

  block.setAttribute('data-video-status', 'loaded');
}

function loadVideo(block) {
  const status = block.getAttribute('data-video-status');
  // eslint-disable-next-line no-useless-return
  if (status === 'loaded') return;

  const videoLink = block.querySelector('a');
  if (videoLink) {
    // load video from franklin media
    loadFranklinVideo(videoLink.href, block);
  }
}

function intersectHandler(entries) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    const block = entry.target;
    loadVideo(block);
  }
}

export default function decorate(block) {
  const observer = new IntersectionObserver(intersectHandler, { threshold: 0 });
  observer.observe(block);
}
