const Payment = require('../models/payment');

// this is our create method
// this method adds new payment in our database
putPayment = (req, res) => {
    let payment = new Payment();

    const { dni, mes, formaPago, monto} = req.body;

    if ( !dni || !mes || !formaPago || !monto ) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }

    payment.dni = dni;
    payment.mes = mes;
    payment.formaPago = formaPago;
    payment.monto = monto;
    
    payment.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ 
        success: true, 
        payment: {
            dni: payment.dni,
            mes: payment.mes,
            formaPago: payment.formaPago,
            monto: payment.monto
        } 
        });
    });
};

// this is our getClient method
// this method fetches all available payments for a user in our database
getClientPayments = (req, res) => {

    const { dni } = req.params;
    Payment.find({ dni : dni }, 'dni mes monto',(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, clientPayments: data });
    });
};

// this is our get method
// this method fetches all available payments in our database
getPayments = (req, res) => {
    Payment.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, payments: data });
    });
  };

module.exports = {
    putPayment,
    getClientPayments,
    getPayments
    
}