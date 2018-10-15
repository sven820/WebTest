
import home from './home'
import user from './users'


export default app => {
    app.use('/home', home)
    app.use('/user', user)
}
