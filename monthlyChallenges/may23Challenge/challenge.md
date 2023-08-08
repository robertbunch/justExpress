Create a router (or use the default index router from express generator) that manages other routers to consider different architectures for large applications.

As an example, in the main router, import ~4 other routers, each of which has routers of their own. The structure might look like this:

- index.js
    import stripeRouter
    import usersRouter
    import adminRouter
    import dataRouter
    - stripeRouter
        import paymentsRouter
        import customersRouter
    - usersRouter
        import authRouter
        import settingsRouter
    - adminRouter
        import utilitesRouter
        import settingsRouter
        /admin/utilities/primary
        - /update
        /admin/utilities/secondary
        - /get
    - dataRouter
        import getDataRouter
        import setDataRouter
