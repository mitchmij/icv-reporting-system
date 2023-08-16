module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/vendor_signin');
    },

    checkNotAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/vendor_dashboard')
      }
      next()
    }
}