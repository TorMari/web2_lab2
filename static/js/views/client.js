'use strict'

const clientModel = new Client() 

function initAddForm() {
  const form = window.document.querySelector('#client-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const clientData = {}
    formData.forEach((value, key) => {
      clientData[key] = value
    })

    clientModel.Create(clientData, 'clientID')

    e.target.reset()
  })
}


function initList() {
  window.jQuery('#client-list').DataTable({
    data: clientModel.Select(),
    columns: [
      { title: 'Name', data: 'name' },
      { title: 'Code', data: 'id' },
      { title: 'Budget', data: 'budget' },
      {
        title: "Options", defaultContent: '<div class="box"><a class="btn btn-info" href="#">Edit</a> <a class="btn btn-danger">Delete</a></div>', "width": "25%"
      }
    ]
  })
}


function initOption() {
  const table = window.jQuery('#client-list').DataTable()
  let row, data;

  $('#client-list').on('click', '.btn-danger', function () {
    row = $(this).closest('tr');
    data = table.row(row).data().id;
    console.log(data);
    let i = clientModel.FindIndexById(data);
    let clients = JSON.parse(localStorage.getItem('clients'));
    clients.splice(i, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
    table.row(row).remove().draw();
  });

  let row1, row2;

  $('#client-list').on('click', '.btn-info', function () {
    row1 = $(this).closest('td');
    row2 = $(this).closest('tr');
    row1.find('.btn-info').hide();
    let block = `<tr><td>Name<input id="nam" class="form-control" value="${table.row(row2).data().name}"/></td><td>Budget<input id="npas" class="form-control" value="${table.row(row2).data().budget}"/></td><td><a id="save-btn" class= "btn btn-success">Save</a></td></tr>`
    row1.append(block);

  });

  $('#client-list').on('click', '.btn-success', function () {
    let blc = $(this).closest('tr')
    let name = table.row(row2).data().id;
    let i = clientModel.FindIndexById(name);
    let clients = JSON.parse(localStorage.getItem('clients'));
    let eln = document.getElementById('nam');
    clients[i].name = eln.value;
    let elp = document.getElementById('npas');
    clients[i].budget = elp.value;
    localStorage.setItem('clients', JSON.stringify(clients));
    table.cell(row2, 0).data(eln.value).cell(row2, 2).data(elp.value).draw();

    blc.remove();
    row1.find('.btn-info').show();
  })
}


function initListEvents() {
  document.addEventListener('clientsListDataChanged', function (e) {
    const dataTable = window.jQuery('#client-list').DataTable()

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
})
