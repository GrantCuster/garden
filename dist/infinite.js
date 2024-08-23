const monthNames = ["2024-08"];
let index = window.location.pathname === '/' ? 0 : monthNames.indexOf(window.location.pathname)
window.addEventListener('scroll', (e) => {
  if (document.body.scrollTop + window.innerHeight > document.body.scrollHeight - 200) {
    index++;
    if (index < monthNames.length) {
      const target = monthNames[index];
      const url = window.location.origin + '/' + target + '.html';
      const content = fetch(url).then(response => response.text()).then(text => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const newPosts = doc.querySelector('.posts');
        document.querySelector('.posts').appendChild(newPosts);
      })
    }
  }
});