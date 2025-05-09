document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('footer-data.json');
    const data = await response.json();
    
    const footerContainer = document.querySelector('.site-footer__grid');
    
    data.footer.sections.forEach(section => {
      const sectionElement = document.createElement('div');
      sectionElement.className = 'site-footer__section';
      
      const titleElement = document.createElement('h3');
      titleElement.className = 'site-footer__title';
      titleElement.textContent = section.title;
      
      const linksList = document.createElement('ul');
      linksList.className = 'site-footer__links';
      
      section.links.forEach(link => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = '#';
        anchor.className = 'site-footer__link';
        anchor.textContent = link;
        listItem.appendChild(anchor);
        linksList.appendChild(listItem);
      });
      
      sectionElement.appendChild(titleElement);
      sectionElement.appendChild(linksList);
      footerContainer.appendChild(sectionElement);
    });
  } catch (error) {
    console.error('Error loading footer data:', error);
  }
});