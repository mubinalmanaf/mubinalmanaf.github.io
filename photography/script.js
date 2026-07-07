// Photography Collections Script
(function() {
  'use strict';

  const collectionsGrid = document.getElementById('collectionsGrid');

  // Collections with preview and image count
  const collections = [
    {
      name: 'Bratislava',
      slug: 'bratislava',
      description: 'Urban exploration and architectural photography from Bratislava.',
      imageCount: 10,
      previewImage: '../Photos/Bratislava/NK6_5830.jpg'
    },
    {
      name: 'Film',
      slug: 'film',
      description: 'A selection of film photography and analog work.',
      imageCount: 7,
      previewImage: '../Photos/Film/img078.jpg'
    }
  ];

  function initCollections() {
    collectionsGrid.innerHTML = '';
    
    collections.forEach((collection) => {
      const item = document.createElement('a');
      item.href = `${collection.slug}/`;
      item.className = 'collection-card reveal';
      item.innerHTML = `
        <div class="collection-card__image">
          <img src="${collection.previewImage}" alt="${collection.name}" loading="lazy">
          <div class="collection-card__overlay">
            <span class="collection-card__count">${collection.imageCount} photos</span>
          </div>
        </div>
        <div class="collection-card__content">
          <h2 class="collection-card__title">${collection.name}</h2>
          <p class="collection-card__desc">${collection.description}</p>
          <span class="collection-card__cta">View collection →</span>
        </div>
      `;
      collectionsGrid.appendChild(item);
    });

    triggerRevealAnimation();
  }

  function triggerRevealAnimation() {
    if (!document.documentElement.classList.contains('js')) return;
    
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  }

  initCollections();
})();

