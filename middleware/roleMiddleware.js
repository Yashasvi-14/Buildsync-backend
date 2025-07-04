const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        try{
        const userRole = req.user.role;
        console.log('Checking User role:', userRole);
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({message: 'Access denied. Insufficient permissions.'});
        }
        next();
    } catch(err){
        console.error("Role middleware error:", err);
        res.status(500).json({message: 'Internal server error in role middleware.'});
    }
    };
};

module.exports=roleMiddleware;