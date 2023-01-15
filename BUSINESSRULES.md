
# Sumário
- [Sumário](#sumário)
- [Cadastro de Carro](#cadastro-de-carro)
- [Litagem de Carros](#litagem-de-carros)
- [Cadastro de Especificação do Carro](#cadastro-de-especificação-do-carro)
- [Cadastro de Imagens do Carro](#cadastro-de-imagens-do-carro)
- [Aluguel de Carro](#aluguel-de-carro)

<br/>

# Cadastro de Carro

**Requisitos Funcionais**

- Deve ser possível cadastrar um novo carro.

**Regras de Negócio**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- * O usuário responsável pelo cadastro deve ser um usuário administrador.

<br/>

# Litagem de Carros

**Requisitos Funcionais**

- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regras de Negócio**

- O usuário não precisa estar autenticado no sistema.

<br/>

# Cadastro de Especificação do Carro

**Requisitos Funcionais**

- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**Regras de Negócio**

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

<br/>

# Cadastro de Imagens do Carro

**Requisitos Funcionais**

- Deve ser possível cadastrar uma imagem do carro.
- Deve ser possível listar todos os carros.

**Regras de NegócioF**

- Utiliar o multer para o upload dos arquivos.

**Regras de Negócio**

- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastro deve ser um usuário administrador.

<br/>

# Aluguel de Carro

**Requisitos Funcionais**

- Deve ser possível cadastrar um aluguel.

**Regras de Negócio**

- O aluguel deve duração mínima de 24 (vinte e quatro) horas.
- Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um aluguel caso já exista um aberto para o mesmo carro.
