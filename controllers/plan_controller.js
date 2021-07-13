const Plan = require('../models/plan');

// this is our get method
// this method fetches all available plans in our database
getPlans = (req, res) => {
    Plan.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, clients: data });
    });
  };

  // this is our update method
// this method overwrites existing data in our database
updatePlan = (req, res) => {
    const { filter, update } = req.body;
    console.log(filter);
    Plan.findOneAndUpdate(filter, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this is our delete method
// this method removes existing data in our database
deletePlan = (req, res) => {
    const { filter } = req.body;
    console.log(filter);
    Plan.findOneAndRemove(filter, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};

// this is our create method
// this method adds new data in our database
putPlan = (req, res) => {
    let plan = new Plan();

    const { nombre, monto, montoDescuento} = req.body;

    if (!nombre || !monto ||!montoDescuento) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }

    plan.nombre = nombre;
    plan.monto = monto;
    plan.montoDescuento = montoDescuento;
    
    plan.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ 
        success: true, 
        plan: {
            nombre: plan.nombre,
            monto: plan.monto,
            montoDescuento: plan.montoDescuento
        } 
        });
    });
};

module.exports = {
    getPlans, 
    updatePlan,
    deletePlan,
    putPlan
    
}