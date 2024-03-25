const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000  || process.env.PORT;

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "motocycle",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Middleware to parse JSON requests
app.use(bodyParser.json());
// Use CORS middleware with specific options
app.use(cors());
//#region
// Create operation
app.post("/createUser", (req, res) => {
  const { nom_user, prenom_user, telephone, type_user, password } = req.body;
  const query =
    "INSERT INTO users (nom_user,prenom_user,telephone,type_user,password) VALUES (?, ?,?,?,?)";

  connection.query(
    query,
    [nom_user, prenom_user, telephone, type_user, password],
    (err, results) => {
      if (err) throw err;
      res.send("User added successfully");
    }
  );
});

// Read operation
app.get("/getUser/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?";

  connection.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update operation
app.put("/updateUser/:id", (req, res) => {
  const userId = req.params.id;
  const { nom_user, prenom_user, telephone, type_user, password } = req.body;
  const query =
    "UPDATE users SET nom_user = ?, prenom_user = ?, telephone = ?, type_user = ?, password = ? WHERE id = ?";

  connection.query(
    query,
    [nom_user, prenom_user, telephone, type_user, password, userId],
    (err, results) => {
      if (err) throw err;
      res.send("User updated successfully");
    }
  );
});

// Delete operation
app.delete("/deleteUser/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";

  connection.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.send("User deleted successfully");
  });
});

// Get All Users
app.get("/getAllUsers", (req, res) => {
  const query = "select *  FROM users";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//#endregion
//#region ========================================= la gestion fournisseur =============================================================================================
// Create operation
app.post("/createFournisseur", (req, res) => {
  const { nom, telephone, adress } = req.body;
  const query =
    "INSERT INTO fournisseurs (nom_f,telephone,adress) VALUES (? , ? , ?)";
  connection.query(query, [nom, telephone, adress], (err, results) => {
    if (err) throw err;
    res.send("Fournisseur added successfully");
  });
});

// Read operation
app.get("/getFournisseur/:id", (req, res) => {
  const fournisseurId = req.params.id;
  const query = "SELECT * FROM fournisseurs WHERE id = ?";

  connection.query(query, [fournisseurId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update operation
app.put("/updateFournisseur/:id", (req, res) => {
  const FournisseurId = req.params.id;
  const { nom, telephone, adress } = req.body;
  const query =
    "UPDATE fournisseurs SET nom_f = ?, telephone = ?, adress = ?  WHERE id = ?";

  connection.query(
    query,
    [nom, telephone, adress, FournisseurId],
    (err, results) => {
      if (err) throw err;
      res.send("User updated successfully");
    }
  );
});

// Delete operation
app.delete("/deleteFournisseur/:id", (req, res) => {
  const FournisseurId = req.params.id;
  const query = "DELETE FROM fournisseurs WHERE id = ?";

  connection.query(query, [FournisseurId], (err, results) => {
    if (err) throw err;
    res.send("User deleted successfully");
  });
});

// Get All Users
app.get("/getAllFournisseurs", (req, res) => {
  const query = "select *  FROM fournisseurs";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

//#endregion

//#region
// Create operation
app.post("/createProduit", (req, res) => {
  const { nom, prix_unitaire, prix_vente } = req.body;
  const query =
    "INSERT INTO produits (nom,prix_unitaire,prix_vente) VALUES (?, ?, ?)";

  connection.query(query, [nom, prix_unitaire, prix_vente], (err, results) => {
    if (err) throw err;
    res.send("Produit added successfully");
  });
});

// Read operation
app.get("/getProduit/:id", (req, res) => {
  const produitId = req.params.id;
  const query = "SELECT * FROM produits WHERE id = ?";
  connection.query(query, [produitId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update operation
app.put("/updateProduit/:id", (req, res) => {
  const produitId = req.params.id;
  const { nom, prix_unitaire, prix_vente } = req.body;
  const query =
    "UPDATE produits SET nom = ?, prix_unitaire = ?, prix_vente = ? WHERE id = ?";

  connection.query(
    query,
    [nom, prix_unitaire, prix_vente, produitId],
    (err, results) => {
      if (err) throw err;
      res.send("Produit updated successfully");
    }
  );
});

// Delete operation
app.delete("/deleteProduit/:id", (req, res) => {
  const produitId = req.params.id;
  const query = "DELETE FROM produits WHERE id = ?";

  connection.query(query, [produitId], (err, results) => {
    if (err) throw err;
    res.send("Produit deleted successfully");
  });
});

// delete muti products
app.delete("/deleteMultiple", (req, res) => {
  const ids = req.body.ids; // Assuming you're sending IDs in the request body

  const query = `DELETE FROM produits WHERE id IN (${ids.join(",")})`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }

    return res
      .status(200)
      .json({ message: "Multiple rows deleted successfully" });
  });
});

// Get All Products
app.get("/getAllProducts", (req, res) => {
  const query = "select *  FROM produits";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//#endregion

//#region
// Create operation
app.post("/createAchat", (req, res) => {
  const { date_achat, quantite_achat, id_produit, id_user, id_fournisseur } =
    req.body;
  const query =
    "INSERT INTO achat (date_achat,	quantite_achat	,id_produit,	id_user	,id_fournisseur	) VALUES (?, ?,?,?,?)";

  connection.query(
    query,
    [date_achat, quantite_achat, id_produit, id_user, id_fournisseur],
    (err, results) => {
      if (err) throw err;
      res.send("User added successfully");
    }
  );
});
//DiplaysAchat
app.get("/dispalyAchats", (req, res) => {
  const query =
    "SELECT a.id, a.date_achat, a.quantite_achat , p.nom , f.nom_f from achat as a   LEFT JOIN produits as p on a.id_produit = p.id   LEFT JOIN fournisseurs as f on a.id_fournisseur = f.id;";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// Read operation
app.get("/getAchat/:id", (req, res) => {
  const achatId = req.params.id;
  const query = "SELECT * FROM achat WHERE id = ?";

  connection.query(query, [achatId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update operation
app.put("/updateAchat/:id", (req, res) => {
  const achatId = req.params.id;
  const { date_achat, quantite_achat, id_produit, id_user, id_fournisseur } =
    req.body;
  const query =
    "UPDATE achat SET quantite_achat = ?, id_produit = ?, id_user = ?, id_fournisseur = ? WHERE id = ?";

  connection.query(
    query,
    [quantite_achat, id_produit, id_user, id_fournisseur, achatId],
    (err, results) => {
      if (err) throw err;
      res.send("Achat updated successfully");
    }
  );
});

// Delete operation
app.delete("/deleteAchat/:id", (req, res) => {
  const achatId = req.params.id;
  const query = "DELETE FROM achat WHERE id = ?";

  connection.query(query, [achatId], (err, results) => {
    if (err) throw err;
    res.send("Achat deleted successfully");
  });
});

// Get All Users
app.get("/getAllAchat", (req, res) => {
  const query = "select *  FROM achat";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//#endregion

//#region  client
app.post("/createClient", (req, res) => {
  const { nom, telephone, adress } = req.body;
  const query = "INSERT INTO client (nom,	telephone	,adress	) VALUES (?, ?,?)";

  connection.query(query, [nom, telephone, adress], (err, results) => {
    if (err) throw err;
    res.send("Client added successfully");
  });
});

// Read operation
app.get("/getClient/:id", (req, res) => {
  const clientId = req.params.id;
  const query = "SELECT * FROM client WHERE id = ?";

  connection.query(query, [clientId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update operation
app.put("/updateClient/:id", (req, res) => {
  const clientId = req.params.id;
  const { nom, telephone, adress } = req.body;
  const query =
    "UPDATE client SET nom = ?, telephone = ?, adress = ? WHERE id = ?";

  connection.query(
    query,
    [nom, telephone, adress, clientId],
    (err, results) => {
      if (err) throw err;
      res.send("Client updated successfully");
    }
  );
});

// Delete operation
app.delete("/deleteClient/:id", (req, res) => {
  const clientId = req.params.id;
  const query = "DELETE FROM client WHERE id = ?";

  connection.query(query, [clientId], (err, results) => {
    if (err) throw err;
    res.send("Client deleted successfully");
  });
});

// Get All Users
app.get("/getAllClients", (req, res) => {
  const query = "select *  FROM client";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//#endregion

//#region  vente
app.post("/createVente", (req, res) => {
  const { date_vent, quantite_vente, id_produit, id_user, id_client } =
    req.body;
  const queryGetProduit = "SELECT * FROM produits WHERE id = ?";
  connection.query(queryGetProduit, [id_produit], (err, results) => {
    if (err) throw err;
   console.log(results);
    // Convert MySQL results into an object
    const dataObject = {};
    results.forEach((row) => {
      dataObject[row.id] = {
        nom: row.nom,
        prix_unitaire: row.prix_unitaire,
        prix_vente: row.prix_vente,
        // Add more properties as needed
      };
    });
    console.log(dataObject[id_produit]);
    const prix_achat = dataObject[id_produit].prix_unitaire;
    const prix_vente = dataObject[id_produit].prix_vente;
    const defference = prix_vente - prix_achat;
    const bénéfice_net = Number(quantite_vente) * Number(defference);
    console.log(defference);
    const query =
      "INSERT INTO vente (date_vent	,quantite_vente	,pu_achat	,pu_vente	,différence_de_bénéfice	,id_produit,	id_user	,id_client,bénéfice_net) VALUES (?,?,?,?,?,?,?,?,?)";
    connection.query(
      query,
      [
        date_vent,
        quantite_vente,
        prix_achat,
        prix_vente,
        defference,
        id_produit,
        id_user,
        id_client,
        bénéfice_net,
      ],
      (err, results) => {
        if (err) throw err;
        res.send("Vente added successfully");
      }
    );
  });
});

// Read operation
app.get("/getVente/:id", (req, res) => {
  const venteId = req.params.id;
  const query = "SELECT * FROM vente WHERE id = ?";

  connection.query(query, [venteId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update operation
app.put("/updateVente/:id", (req, res) => {
  //const venteId = req.params.id
  const { date_vent, quantite_vente, id_produit, id_user, id_client } =
    req.body;
  const queryGetProduit = "SELECT * FROM produits WHERE id = ?";
  connection.query(queryGetProduit, [id_produit], (err, results) => {
    if (err) throw err;
    // res.json(results);
    // Convert MySQL results into an object
    const dataObject = {};
    results.forEach((row) => {
      dataObject[row.id] = {
        nom: row.nom,
        prix_unitaire: row.prix_unitaire,
        prix_vente: row.prix_vente,
        // Add more properties as needed
      };
    });
    console.log(dataObject[id_produit]);
    const prix_achat = dataObject[id_produit].prix_unitaire;
    const prix_vente = dataObject[id_produit].prix_vente;
    const defference = prix_vente - prix_achat;
    const bénéfice_net = Number(quantite_vente) * Number(defference);
    console.log(defference);

    const query =
      "UPDATE vente SET date_vent = ?, quantite_vente = ?, pu_achat = ?, pu_vente = ?,  différence_de_bénéfice = ?,  id_produit = ?,  id_user = ? ,id_client = ? , bénéfice_net = ?  WHERE id = ?";
    const venteId = req.params.id;

    connection.query(
      query,
      [
        date_vent,
        quantite_vente,
        prix_achat,
        prix_vente,
        defference,
        id_produit,
        id_user,
        id_client,
        bénéfice_net,
        venteId,
      ],
      (err, results) => {
        if (err) throw err;
        res.send("Vente updated successfully");
      }
    );
  });
});

// Delete operation
app.delete("/deleteVente/:id", (req, res) => {
  const venteId = req.params.id;
  const query = "DELETE FROM vente WHERE id = ?";

  connection.query(query, [venteId], (err, results) => {
    if (err) throw err;
    res.send("vente deleted successfully");
  });
});

// Get All Users
app.get("/getAllVente", (req, res) => {
  const query = "select *  FROM vente";
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


// display vente 
app.get("/displayVente", (req, res) => {
  const query = "SELECT v.id, v.date_vent  ,v.quantite_vente ,v.pu_achat ,v.pu_vente ,v.différence_de_bénéfice ,v.bénéfice_net ,p.nom as nom_produit, c.nom FROM  vente as v   LEFT JOIN produits as p on v.id_produit = p.id  LEFT JOIN client as c on v.id_client = c.id;";

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// count all rba7 

app.get('/getSumVente',(req,res)=> {
  const query = "SELECT SUM(bénéfice_net) as sum FROM vente;";

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
})
//#endregion
// Start the server
app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
});
