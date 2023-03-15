'use strict'

const projectModel = new Project() // eslint-disable-line no-undef

function initAddForm() {
   const form = window.document.querySelector('#project-add-form')
   form.addEventListener('submit', function (e) {
      e.preventDefault()

      const formData = new FormData(e.target)
      const projectData = {}
      formData.forEach((value, key) => {
         projectData[key] = value
      })

      //projectModel.Create(projectData, 'projectID')
      projectModel.projectCreate(projectData, 'projectID')


      e.target.reset()
   })
}


function initList() {
   window.jQuery('#project-list').DataTable({
      data: projectModel.Select(),
      columns: [
         { title: 'Name', data: 'name' },
         { title: '№', data: 'id' },
         { title: 'Description', data: 'description' },
         { title: 'Client', data: 'client' },
         {
            title: "Options", defaultContent: '<div class="box"><a class="btn btn-info">Edit</a> <a class="btn btn-danger">Delete</a></div>', "width": "30%"
         }
      ]
   })
}


function initOption() {
   const table = window.jQuery('#project-list').DataTable()
   let row, data;

   $('#project-list').on('click', '.btn-danger', function () {
      row = $(this).closest('tr');
      data = table.row(row).data().id;
      //console.log(data);
      let i = projectModel.FindIndexById(data);
      let projects = JSON.parse(localStorage.getItem('projects'));
      projects.splice(i, 1);
      localStorage.setItem('projects', JSON.stringify(projects));
      table.row(row).remove().draw();


   });

   let row1, row2;

   $('#project-list').on('click', '.btn-info', function () {
      row1 = $(this).closest('td');
      row2 = $(this).closest('tr');
      row1.find('.btn-info').hide();
      let block = `<tr><td>Name<input id="tnam" class="form-control" value="${table.row(row2).data().name}"/></td><td>Description<input id="tpas" class="form-control" value="${table.row(row2).data().description}"/></td><td>Client<input id="tnum" class="form-control" value="${table.row(row2).data().client}"/></td><td><a class= "btn btn-success">Save</a></td></tr>`
      row1.append(block);

   });

   $('#project-list').on('click', '.btn-success', function () {
      let blc = $(this).closest('tr')
      let name = table.row(row2).data().id;
      let i = projectModel.FindIndexById(name);
      let projects = JSON.parse(localStorage.getItem('projects'));
      let eln = document.getElementById('tnam');
      projects[i].name = eln.value;
      let elp = document.getElementById('tpas');
      projects[i].description = elp.value;
      let elnum = document.getElementById('tnum');
      projects[i].client = elnum.value;
      localStorage.setItem('projects', JSON.stringify(projects));

      //table.clear();
      //table.row(row2).remove();
      //table.rows.add(row2);
      table.cell(row2, 0).data(eln.value).cell(row2, 2).data(elp.value).cell(row2, 3).data(elnum.value).draw();

      //console.log(table.row(row2).data().name);
      //initListEvents();
      //table.rows.add(row2);
      //table.row(row2).data().name = eln.value;
      //table.row(row2).data().address = elp.value;
      //table.draw();
      blc.remove();
      row1.find('.btn-info').show();

   })

}


function initListEvents() {
   document.addEventListener('projectsListDataChanged', function (e) {
      const dataTable = window.jQuery('#project-list').DataTable()

      dataTable.clear()
      dataTable.rows.add(e.detail)
      dataTable.draw()
   }, false)
}

window.addEventListener('DOMContentLoaded', e => {
   initAddForm()
   initList()
   initOption()
   initListEvents()
   //console.log(shopModel.Select());
   //console.log(shopModel.Select().values())
   //localStorage.removeItem('shops')
   //dataTable.clear()
   //localStorage.clear()
   //shopData.getEmpty();
   //console.log(shopModel.FindById(1))
   /*let shops = JSON.parse(localStorage.getItem('shops'));
   shops.splice(0, 1);
   localStorage.setItem('shops', JSON.stringify(shops));*/
   //dataTable.clear();
   //dataTable.draw();
})
