class ProjInProg extends BaseModel { 
  constructor () {
    super('progress')
    this.fields = this.fields.concat(['project', 'doer', 'start', 'finish'])
  }
}