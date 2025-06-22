### 1. Descrição de alto nível do módulo

Implementa a camada View/API utilizando Express e TypeScript, responsável por expor endpoints REST para as entidades Tutor, Animal, Consulta e VacinaAplicada. Este módulo recebe requisições HTTP, valida dados de entrada e aciona os métodos públicos dos Controllers, servindo como interface entre o usuário/cliente e a lógica de negócio do sistema. Centraliza o roteamento, garante respostas HTTP apropriadas e mantém o desacoplamento da lógica de persistência.

---

### 2. Lista dos métodos públicos acessíveis neste módulo

* POST /tutores (data: Omit\<ITutor, "id" | "ativo">): ITutor | { error: string }
  — Cadastra um novo tutor.

* GET /tutores/\:id (id: string): ITutor | { error: string }
  — Consulta um tutor pelo ID.

* GET /tutores (): ITutor\[]
  — Lista todos os tutores cadastrados.

* PATCH /tutores/\:id (id: string, data: Partial\<Omit\<ITutor, "id" | "ativo">>): ITutor | { error: string }
  — Atualiza os dados de um tutor.

* DELETE /tutores/\:id (id: string): { success: boolean; error?: string }
  — Inativa um tutor caso não tenha animais vinculados.

* POST /animais (data: Omit\<IAnimal, "id" | "ativo">, tutorId: string): IAnimal | { error: string }
  — Cadastra um novo animal vinculado a um tutor existente.

* GET /animais/\:id (id: string): IAnimal | { error: string }
  — Consulta um animal pelo ID.

* GET /animais (): IAnimal\[]
  — Lista todos os animais.

* PATCH /animais/\:id (id: string, data: Partial\<Omit\<IAnimal, "id" | "tutorId" | "ativo">>): IAnimal | { error: string }
  — Atualiza dados permitidos do animal.

* DELETE /animais/\:id (id: string): { success: boolean; error?: string }
  — Inativa um animal pelo ID.

* GET /animais/tutor/\:tutorId (tutorId: string): IAnimal\[] | { error: string }
  — Lista animais vinculados a um tutor específico.

* POST /consultas (data: Omit\<IConsulta, "id" | "encerrada">, animalId: string): IConsulta | { error: string }
  — Cadastra uma nova consulta para um animal válido.

* GET /consultas/\:id (id: string): IConsulta | { error: string }
  — Consulta uma consulta pelo ID.

* GET /consultas (): IConsulta\[]
  — Lista todas as consultas cadastradas.

* PATCH /consultas/\:id (id: string, data: Partial\<Omit\<IConsulta, "id" | "animalId">>): IConsulta | { error: string }
  — Atualiza dados permitidos de uma consulta.

* DELETE /consultas/\:id (id: string): { success: boolean; error?: string }
  — Remove uma consulta pelo ID.

* GET /consultas/animal/\:animalId (animalId: string): IConsulta\[] | { error: string }
  — Lista consultas de um animal específico.

* POST /vacinas-aplicadas (data: Omit\<IVacinaAplicada, "id">, animalId: string, consultaId: string): IVacinaAplicada | { error: string }
  — Cadastra uma vacina aplicada, vinculando a animal e consulta válidos.

* GET /vacinas-aplicadas/\:id (id: string): IVacinaAplicada | { error: string }
  — Consulta uma vacina aplicada pelo ID.

* GET /vacinas-aplicadas (): IVacinaAplicada\[]
  — Lista todas as vacinas aplicadas.

* PATCH /vacinas-aplicadas/\:id (id: string, data: Partial\<Omit\<IVacinaAplicada, "id" | "animalId" | "consultaId">>): IVacinaAplicada | { error: string }
  — Atualiza dados permitidos de uma vacina aplicada.

* DELETE /vacinas-aplicadas/\:id (id: string): { success: boolean; error?: string }
  — Remove uma vacina aplicada pelo ID.

* GET /vacinas-aplicadas/animal/\:animalId (animalId: string): IVacinaAplicada\[] | { error: string }
  — Lista vacinas aplicadas para um animal específico.
