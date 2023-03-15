'use strict'

const progModel = new ProjInProg() 

function initAddForm() {
  const form = window.document.querySelector('#prog-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const progData = {}
    formData.forEach((value, key) => {
      progData[key] = value
    })

    progModel.collectionCreate(progData, 'progID')

    e.target.reset()
  })
}



function initList() {
  window.jQuery('#prog-list').DataTable({
    data: progModel.Select(),
    columns: [
      { title: 'Project', data: 'project' },
      { title: 'Project doer', data: 'doer' },
      { title: 'Start date', data: 'start' },
      { title: 'Finish date', data: 'finish' },
      {
        title: "Options", defaultContent: '<div class="box"><a class="btn btn-danger">Delete</a></div>', "width": "10%"
      }
    ]
  })
}


function initProgOption() {
  var table = window.jQuery('#prog-list').DataTable();
  var row, data;
  $('#prog-list').on('click', '.btn-danger', function () {
      row = $(this).closest('tr');
      data = table.row(row).data().id;
      var i = progModel.FindIndexById(data);
      var projects = JSON.parse(localStorage.getItem('progress'));
      projects.splice(i, 1);
      localStorage.setItem('progress', JSON.stringify(projects));
      table.row(row).remove().draw();
  });
}


function initListEvents() {
  document.addEventListener('progressListDataChanged', function (e) {
    const dataTable = window.jQuery('#prog-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initProgOption()
  initListEvents()
})
