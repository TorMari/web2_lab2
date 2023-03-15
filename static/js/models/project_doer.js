class ProjectDoer extends BaseModel { 
   constructor () {
     super('doers')
     this.fields = this.fields.concat(['name', 'experience', 'number'])
   }
 }