'use strict'

const doerModel = new ProjectDoer() 

function initAddForm() {
   const form = window.document.querySelector('#doer-add-form')
   form.addEventListener('submit', function (e) {
      e.preventDefault()

      const formData = new FormData(e.target)
      const doerData = {}
      formData.forEach((value, key) => {
         doerData[key] = value
      })

      doerModel.Create(doerData, 'doerID')

      e.target.reset()
   })
}


function initList() {
   window.jQuery('#doer-list').DataTable({
      data: doerModel.Select(),
      columns: [
         { title: 'Name', data: 'name' },
         { title: 'Code', data: 'id' },
         { title: 'Experience', data: 'experience' },
         { title: 'Number of workers', data: 'number' },
         {
            title: "Options", defaultContent: '<div class="box"><a class="btn btn-info">Edit</a> <a class="btn btn-danger">Delete</a></div>', "width": "30%"
         }
      ]
   })
}




function initOption() {
   const table = window.jQuery('#doer-list').DataTable()
   let row, data;

   $('#doer-list').on('click', '.btn-danger', function () {
      row = $(this).closest('tr');
      data = table.row(row).data().id;
      //console.log(data);
      let i = doerModel.FindIndexById(data);
      let doers = JSON.parse(localStorage.getItem('doers'));
      doers.splice(i, 1);
      localStorage.setItem('doers', JSON.stringify(doers));
      table.row(row).remove().draw();


   });

   let row1, row2;

   $('#doer-list').on('click', '.btn-info', function () {
      row1 = $(this).closest('td');
      row2 = $(this).closest('tr');
      row1.find('.btn-info').hide();
      let block = `<tr><td>Name<input id="tnam" class="form-control" value="${table.row(row2).data().name}"/></td><td>Experience<input id="tpas" class="form-control" value="${table.row(row2).data().experience}"/></td><td>Number of workers<input id="tnum" class="form-control" value="${table.row(row2).data().number}"/></td><td><a class= "btn btn-success">Save</a></td></tr>`
      row1.append(block);

   });

   $('#doer-list').on('click', '.btn-success', function () {
      let blc = $(this).closest('tr')
      let name = table.row(row2).data().id;
      let i = doerModel.FindIndexById(name);
      let doers = JSON.parse(localStorage.getItem('doers'));
      let eln = document.getElementById('tnam');
      doers[i].name = eln.value;
      let elp = document.getElementById('tpas');
      doers[i].experience = elp.value;
      let elnum = document.getElementById('tnum');
      doers[i].number = elnum.value;
      localStorage.setItem('doers', JSON.stringify(doers));

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
   document.addEventListener('doersListDataChanged', function (e) {
      const dataTable = window.jQuery('#doer-list').DataTable()

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
   //ocalStorage.removeItem('shops')
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
