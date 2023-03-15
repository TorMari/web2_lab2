class Client extends BaseModel { 
   constructor () {
     super('clients')
     this.fields = this.fields.concat(['name', 'budget'])
   }
 }