const monthNames = ["2024-10","2024-09","2024-08","2024-07","2024-06","2024-05","2024-04","2024-03","2024-02","2024-01","2023-12","2023-11","2023-10","2023-09","2023-08","2023-07","2023-05","2023-04","2023-03","2023-02","2023-01","2022-12","2022-11","2022-10","2022-09","2022-08","2022-07","2022-06","2022-05","2022-04","2022-03","2022-02","2022-01","2021-12","2021-11","2021-10","2021-09","2021-08","2021-07","2021-06","2021-05","2021-04","2021-03","2021-02","2021-01","2020-12","2020-11","2020-10","2020-09","2020-08","2020-07","2020-06","2020-05","2020-04","2020-03","2020-02","2020-01","2019-12","2019-11","2019-10","2019-09","2019-08","2019-07","2019-06","2019-05","2019-04","2019-03","2019-02","2019-01","2018-12","2018-11","2018-10","2018-09","2018-08","2018-07","2018-06","2018-05","2018-04","2018-03","2018-02","2018-01","2017-12","2017-11","2017-10","2017-09","2017-08","2017-07","2017-06","2017-05","2017-04","2017-03","2017-02","2017-01","2016-12","2016-11","2016-10","2016-09","2016-08","2016-07","2016-06","2016-05","2016-04","2016-03"];
let index = window.location.pathname === '/' ? 0 : monthNames.indexOf(window.location.pathname)
function handleScroll() {
console.log(document.body.scrollHeight - 200)
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
}
window.addEventListener('scroll', handleScroll);
setTimeout(handleScroll, 1000)