const monthNames = ["2024-08","2024-07","2024-06","2024-05","2024-04","2023-10","2022-09","2020-07","2020-06"];
console.log(monthNames);
let index = 0;
window.addEventListener('scroll', (e) => {
console.log(document.body.scrollTop + window.innerHeight)
console.log(document.body.scrollHeight)
if (document.body.scrollTop + window.innerHeight > document.body.scrollHeight - 100) {
console.log('load it')
}
});
