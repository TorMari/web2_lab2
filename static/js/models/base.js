class BaseModel {
  constructor (collectionName) {
    this.collectionName = collectionName
    this.fields = ['id']
  }


  getNextId (collection) {
    return collection.length+1;
  }


  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }


  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }


  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }



  FindById (id) {
    return this.Select().find(item => item.id === id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById (name) {
    return this.Select().findIndex(item => item.id === name)
  }

  /*nid() {
    let arr = JSON.parse(localStorage.getItem('pasID')) || [];
    arr.push(arr.length);
    localStorage.setItem('pasID', arr);
    return arr;
  }*/

  Create (row, arrID) {
    const collection = this.Select()
    const entry = this.GetEmpty()
    
    let arr = JSON.parse(localStorage.getItem(arrID)) || [];
    //console.log(arr.length);
    arr.push(arr.length);
    localStorage.setItem(arrID, JSON.stringify(arr));

    entry.id = arr.length;//this.getNextId(nc-1)
    for (const key in row) {
      if (entry.hasOwnProperty(key) && entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    console.log(entry);

    collection.push(entry)

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }


  collectionCreate (row, arrID) {
    const collection = this.Select()
    const entry = this.GetEmpty()
    
    let arr = JSON.parse(localStorage.getItem(arrID)) || [];
    //console.log(arr.length);

    entry.id = arr.length;//this.getNextId(nc-1)
    for (const key in row) {
      if (entry.hasOwnProperty(key) && entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    //console.log(entry.id);
    let project = JSON.parse(localStorage.getItem('projects'));
    let doer = JSON.parse(localStorage.getItem('doers'));
    let progress = JSON.parse(localStorage.getItem('progress'));
    let start = new Date(entry.start);
    let finish = new Date(entry.finish);
    let g = entry.project.name

    Find(progress, g)

    if (!Find(project, entry.project)) {
      alert('Invalid name of project');
      return 0;
    }

    if (!Find(doer, entry.doer)) {
      alert('Invalid name of project doer');
      return 0;
    }

    if(finish.getTime() <= start.getTime() || entry.start == ''  || entry.finish == '') {
      alert('Invalid dates');
      return 0;
    }

    arr.push(arr.length);
    localStorage.setItem(arrID, JSON.stringify(arr));
    collection.push(entry)

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }



  projectCreate (row, arrID) {
    const collection = this.Select()
    const entry = this.GetEmpty()
    
    let arr = JSON.parse(localStorage.getItem(arrID)) || [];
    //console.log(arr.length);

    entry.id = arr.length;//this.getNextId(nc-1)
    for (const key in row) {
      if (entry.hasOwnProperty(key) && entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    //console.log(entry.id);
    let clients = JSON.parse(localStorage.getItem('clients'));
    let project = JSON.parse(localStorage.getItem('projects'))
    /*let doer = JSON.parse(localStorage.getItem('doers'));
    let start = new Date(entry.start);
    let finish = new Date(entry.finish);*/

    if (!Find(clients, entry.client)) {
      alert('Invalid name of client');
      return 0;
    }

    /*if (!Find(doer, entry.doer)) {
      alert('Invalid name of project doer');
      return 0;
    }

    if(finish.getTime() <= start.getTime() || entry.start == ''  || entry.finish == '') {
      alert('Invalid dates');
      return 0;
    }*/

    arr.push(arr.length);
    localStorage.setItem(arrID, JSON.stringify(arr));
    collection.push(entry)

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }

}


function Find(collection, name) {
  for (let i = 0; i < collection.length; i++) {
    if(collection[i].name == name) {
      console.log(collection[i].name)
      return 1;
    }
  }
  return 0;
}

