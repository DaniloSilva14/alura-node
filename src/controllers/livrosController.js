import livros from "../models/Livro.js"

class LivroController {

    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
                res.status(200).json(livros);
            });
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id)
            .populate('autor', 'nome')
            .exec((err, livro) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} - Id do livro não localizado.` });
                } else {
                    res.status(200).send(livro);
                }
            });
    }

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Erro ao cadastrar livro` });
            } else {
                // res.status(201).send(livro.toJSON());
                res.status(201).send({ message: 'Livro cadastrado com sucesso' });
            }
        })
    }

    static atualizarLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' });
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao atualizar livro` });
            }
        });
    }

    static excluirLivro = (req, res) => {
        const { id } = req.params;

        livros.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send('Livro excluido com sucesso');
            } else {
                res.status(500).send({ message: `${err.message} - Erro ao excluir livro` });
            }
        })
    }

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;

        livros.find({ 'editora': editora }, {}, (err, livro) => {
            res.status(200).send(livro);
        });
    }

}

export default LivroController;