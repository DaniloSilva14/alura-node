import autores from "../models/Autor.js"

class AutorController {

    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores);
        });
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autor) => {
            if (err) {
                res.status(400).send({ message: `${err.message} - Id do autor não localizado.` });
            } else {
                res.status(200).send(autor);
            }
        });
    }

    static cadastrarAutor = (req, res) => {
        let autor = new autores(req.body);

        autor.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Erro ao cadastrar autor` });
            } else {
                // res.status(201).send(autor.toJSON());
                res.status(201).send({ message: 'Autor cadastrado com sucesso' });
            }
        })
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Autor atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao atualizar autor` });
            }
        });
    }

    static excluirAutor = (req, res) => {
        const { id } = req.params;

        autores.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send('Autor  excluido com sucesso');
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao excluir Autor` });
            }
        })
    }

}

export default AutorController;