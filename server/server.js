const express = require('express');
const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();

const multer  = require('multer');
const upload = multer();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

let dbStudent = new sqlite3.Database('Studenti.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the access database.');
});

let dbCerere = new sqlite3.Database('Cereri.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the access database.');
});


app.post('/validarePassword/Student', (req, res) => {
  const { email, password } = req.body;

  dbStudent.all('select * from Studenti where Email = ? and Parola = ?', [email, password], (err, rows) => {
    if (err) {
      console.error(err); 
      throw err;
    }
    if (rows.length > 0) {
      res.send({validation:true, user:rows[0]});
    } else {
      res.send({ validation: false });
    }
  });
});

let dbProfesor = new sqlite3.Database('Profesori.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the access database.');
});

app.post('/validarePassword/Profesor', (req, res) => {
  const { email, password } = req.body;

  dbProfesor.all('select * from Profesori where Email = ? and Parola = ?', [email, password], (err, rows) => {
    if (err) {
      console.error(err); 
      throw err;
    }
    if (rows.length > 0) {
      res.send({validation:true, user:rows[0]});
    } else {
      res.send({ validation: false });
    }
  });
});

app.get('/profesori', (req, res) => {
  dbProfesor.all('SELECT * FROM Profesori', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Eroare la obținerea datelor despre profesori' });
    } else {
      res.send(rows);
    }
  });
});

let dbSolicitari = new sqlite3.Database('Solicitari.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the access database.');
});

app.post('/solicitari', (req, res) => {
  try {
    const { idStudent, numeStudent, prenumeStudent, idProfesor, stareSolicitare, perioada } = req.body;

    // Inserează datele în baza de date
    dbSolicitari.run(
      'INSERT INTO Solicitari (IdStudent, NumeStudent, PrenumeStudent, IdProfesor, StareSolicitare, Perioada) VALUES (?, ?, ?, ?, ?, ?)',
      [idStudent, numeStudent, prenumeStudent, idProfesor, stareSolicitare, perioada],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send({ error: 'Eroare la inserarea solicitării în baza de date' });
        } else {
          // Trimite răspunsul de succes
          res.status(200).send({ success: true, message: 'Solicitare trimisă cu succes!' });
        }
      }
    );
  } catch (error) {
    console.error('Eroare la procesarea solicitării:', error.message);
    res.status(500).send({ error: 'Eroare la procesarea solicitării' });
  }
});

app.get('/solicitariProfesor/:idProfesor', (req, res) => {
  const { idProfesor } = req.params;

  dbSolicitari.all(
    'SELECT * FROM Solicitari WHERE IdProfesor = ?',
    [idProfesor],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la obținerea solicitărilor pentru profesor' });
      } else {
        res.status(200).send({ success: true, solicitari: rows });
      }
    }
  );
});

app.put('/actualizareSolicitare/:idSolicitare', (req, res) => {
  const { idSolicitare } = req.params;
  const { mesaj, stareSolicitare } = req.body;

  dbSolicitari.run(
    'UPDATE Solicitari SET Mesaj = ?, StareSolicitare = ? WHERE IdSolicitare = ?',
    [mesaj, stareSolicitare, idSolicitare],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la actualizarea stării solicitării în baza de date' });
      } else {
        res.status(200).send({ success: true, message: 'Stare solicitare actualizată cu succes!' });
      }
    }
  );
});

app.put('/actualizareCerere/:idCerere', (req, res) => {
  const { idCerere } = req.params;
  const { mesaj, stareCerere } = req.body;

  dbCerere.run(
    'UPDATE Cereri SET Mesaj = ?, StareCerere = ? WHERE IdCerere = ?',
    [mesaj, stareCerere, idCerere],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la actualizarea stării cererii în baza de date' });
      } else {
        res.status(200).send({ success: true, message: 'Stare cerere actualizată cu succes!' });
      }
    }
  );
});

app.get('/solicitariStudent/:idStudent', (req, res) => {
  const { idStudent } = req.params;

  dbSolicitari.all(
    'SELECT * FROM Solicitari WHERE IdStudent = ?',
    [idStudent],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la obținerea solicitărilor pentru student' });
      } else {
        res.status(200).send({ success: true, solicitari: rows });
      }
    }
  );
});

app.get('/cereriStudent/:idStudent', (req, res) => {
  const { idStudent } = req.params;

  dbCerere.all(
    'SELECT * FROM Cereri WHERE IdStudent = ?',
    [idStudent],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la obținerea cererilor pentru student' });
      } else {
        res.status(200).send({ success: true, cereri: rows });
      }
    }
  );
});

app.post('/incarca-cerere/:idStudent', upload.single('file'), async (req, res) => {
  try {
    const fileContent = req.file.buffer; // Conținutul fișierului sub formă de buffer
    const idStudent = req.params.idStudent;
    const idProfesor = req.body.idProfesor;

    // Inserează datele în tabela Cereri
    const query = 'INSERT INTO Cereri (IdStudent, IdProfesor,Cerere) VALUES (?, ?,?)';
    dbCerere.run(query, [idStudent, idProfesor,fileContent], function (err) {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la inserarea cererii în baza de date' });
      } else {
        res.status(200).send({ success: true, message: 'Cererea a fost inserată cu succes!' });
      }
    });
  } catch (error) {
    console.error('Eroare la încărcarea cererii:', error.message);
    res.status(500).send({ error: 'Eroare la încărcarea cererii' });
  }
});

app.get('/descarca-cerere/:idCerere', (req, res) => {
  const { idCerere } = req.params;

  dbCerere.get('SELECT * FROM Cereri WHERE IdCerere = ?', [idCerere], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).send({ error: 'Eroare la obținerea detaliilor cererii pentru descărcare' });
    } else {
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${row.NumeFisier}` // Schimbă NumeFisier cu numele coloanei în care este stocat numele fișierului
      });
      res.status(200).send(row.Cerere);
    }
  });
});


app.get('/cereriProfesor/:idProfesor', (req, res) => {
  const { idProfesor } = req.params;

  dbCerere.all(
    'SELECT * FROM Cereri WHERE IdProfesor = ?',
    [idProfesor],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Eroare la obținerea cererilor pentru profesor' });
      } else {
        res.status(200).send({ success: true, cereri: rows });
      }
    }
  );
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
