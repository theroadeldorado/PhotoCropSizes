fetch("client.json")
.then(res => res.json())
.then(data => {
  const clients = data.posts;
  const sortedClients = clients.sort(function (a, b){
    if(a.name > b.name){
      return 1;
    } else {
      return -1;
    }
  })
  const clientList = document.querySelector('.clients');
  const jumpToClient = document.querySelector('[name=jumpToClient]');
  const buttonDesigner = document.querySelector('.forDesigner');
  const buttonNonDesigner = document.querySelector('.forNonDesigners');
  const designerTut = document.querySelector('.designer-tut');
  const nonDesignerTut = document.querySelector('.non-designer-tut');
  function populateList(clientList, clients) {
    clients.forEach(client => {
      let slug = (client.name.replace(/\s/g, ''));
      slug = slug.replace('.', '');
      jumpToClient.innerHTML = jumpToClient.innerHTML + `<option value="${slug}">${client.name}</option>`;

      let content = `<li class="${slug}"><div class="wrap"><h2>${client.name} <a href="${client.url}" target="_blank">${client.url}</a></h2>`;
      const sections = client.sections;
      sections.forEach(section => {
        content = content + `
        <div class="grid"><h3>${section.sectionName} - ${section.width} X ${section.height}</h3>
        <img src="https://source.unsplash.com/${section.width}x${section.height}/?${client.oneWordDesc}" />
        </div>`;
        if(section.notes){
          content = content + `<p class="notes"><span>&#10033;</span>${section.notes}</p>`;
        }
      });
      content = content + `</div></li>`;
      clientList.innerHTML = clientList.innerHTML + content;
    });
  };
  function scrollToClient(){
    const clientName = jumpToClient.value;
    const clientScrollName = document.querySelector(`.${clientName}`);
    clientScrollName.scrollIntoView({behavior: "smooth"});
  }
  populateList(clientList, clients);
  function showInstructions(e){
    const showTut = this.classList;
    if(showTut.value === "forDesigner"){
      nonDesignerTut.classList.remove('active');
      designerTut.classList.toggle('active');
    } else {
      designerTut.classList.remove('active');
      nonDesignerTut.classList.toggle('active');
    }
  }
  jumpToClient.addEventListener('change', scrollToClient);
  buttonDesigner.addEventListener('click', showInstructions);
  buttonNonDesigner.addEventListener('click', showInstructions);
})



