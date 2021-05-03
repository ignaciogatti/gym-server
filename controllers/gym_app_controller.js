const Client = require('../models/client');
const Payment = require('../models/payment')


// this is our get method
// this method fetches all available data in our database
getClients = (req, res) => {
    Client.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, clients: data });
    });
  };
  
  // this is our getClient method
  // this method fetches all available ratings for a user in our database
getClient = (req, res) => {

    const { dni } = req.params;
    Client.find({ dni : dni }, 'nombre apellido dni',(err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, client: data });
    });
};

// this is our update method
// this method overwrites existing data in our database
updateClient = (req, res) => {
    const { filter, update } = req.body;
    Client.findOneAndUpdate(filter, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this is our delete method
// this method removes existing data in our database
deleteClient = (req, res) => {
    const { filter } = req.body;
    console.log(filter);
    Client.findOneAndRemove(filter, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};

// this is our create method
// this method adds new data in our database
putClient = (req, res) => {
    let client = new Client();

    const { nombre, apellido, dni } = req.body;

    if (!nombre || !apellido || !dni) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }

    client.nombre = nombre;
    client.apellido = apellido;
    client.dni = dni;
    
    client.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ 
        success: true, 
        client: {
            nombre: client.nombre,
            apellido: client.apellido,
            dni: client.dni
        } 
        });
    });
};

// this is our create method
// this method adds new payment in our database
putPayment = (req, res) => {
    let payment = new Payment();

    const { dni, mes, monto } = req.body;

    if ( !dni || !mes || !monto) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }

    payment.dni = dni;
    payment.mes = mes;
    payment.monto = monto;
    
    payment.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ 
        success: true, 
        payment: {
            dni: payment.dni,
            mes: payment.mes,
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

module.exports = {
    getClients,
    getClient,
    updateClient,
    deleteClient,
    putClient,
    putPayment,
    getClientPayments
    
}
