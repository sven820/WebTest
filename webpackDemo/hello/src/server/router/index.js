
import home from './home'
import user from './users'

export default app => {
	// view
	app.use('/', home)
    app.use('/home', home)
    app.use('/user', user)

    // api
    // app.use('/api/getuser', undefined)
}


