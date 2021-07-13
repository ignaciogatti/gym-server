const Client = require('../models/client');



// this is our get method
// this method fetches all available clients in our database
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
    console.log(filter);
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

    const { nombre, apellido, fechaNacimiento, dni, telefono, fechaPagoTemprana } = req.body;

    if (!nombre || !apellido ||!fechaNacimiento || !dni || !telefono || !fechaPagoTemprana) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }

    client.nombre = nombre;
    client.apellido = apellido;
    client.fechaNacimiento = fechaNacimiento;
    client.dni = dni;
    client.telefono = telefono;
    client.fechaPagoTemprana = fechaPagoTemprana;
    
    client.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ 
        success: true, 
        client: {
            nombre: client.nombre,
            apellido: client.apellido,
            fechaNacimiento: client.fechaNacimiento,
            dni: client.dni,
            telefono: client.telefono,
            fechaPagoTemprana: client.fechaPagoTemprana
        } 
        });
    });
};





module.exports = {
    getClients,
    getClient,
    updateClient,
    deleteClient,
    putClient
    
}