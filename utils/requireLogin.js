const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')// If they are not logged in it will redirect them to the logged in page:
    }
    next();// If they are logged in:
}

module.exports = requireLogin