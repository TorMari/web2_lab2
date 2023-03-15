class Project extends BaseModel { 
   constructor () {
     super('projects')
     this.fields = this.fields.concat(['name', 'description', 'client'])
   }
 }