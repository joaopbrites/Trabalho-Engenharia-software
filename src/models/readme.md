### Descrição de alto nível do módulo

Implementa a camada Model responsável pelo armazenamento e gerenciamento em memória das entidades Tutor, Animal, Consulta e VacinaAplicada. Fornece métodos CRUD públicos para garantir integridade referencial e facilitar o consumo pela camada Controller. Simula um banco relacional ACID em memória, servindo como base de dados para operações do sistema veterinário.

---

### Lista dos métodos públicos acessíveis neste módulo

#### TutorModel

* create(data: Omit\<ITutor, "id" | "ativo">): ITutor — Cria um novo tutor com dados fornecidos.
* read(id: string): ITutor | undefined — Busca tutor pelo ID.
* list(): ITutor\[] — Lista todos os tutores cadastrados.
* update(id: string, data: Partial\<Omit\<ITutor, "id" | "ativo">>): ITutor | undefined — Atualiza dados de um tutor existente.
* inactivate(id: string, hasAnimalsFn: (tutorId: string) => boolean): boolean — Inativa um tutor se não houver animais vinculados.

#### AnimalModel

* create(data: Omit\<IAnimal, "id" | "ativo">, tutorExistsFn: (id: string) => boolean): IAnimal | undefined — Cria animal vinculado a tutor existente.
* read(id: string): IAnimal | undefined — Busca animal pelo ID.
* list(): IAnimal\[] — Lista todos os animais.
* update(id: string, data: Partial\<Omit\<IAnimal, "id" | "tutorId" | "ativo">>): IAnimal | undefined — Atualiza dados do animal.
* inactivate(id: string): boolean — Inativa um animal.
* listByTutor(tutorId: string): IAnimal\[] — Lista animais ativos de um tutor.

#### ConsultaModel

* create(data: Omit\<IConsulta, "id" | "encerrada">, animalExistsFn: (id: string) => boolean): IConsulta | undefined — Cria consulta para animal existente.
* read(id: string): IConsulta | undefined — Busca consulta pelo ID.
* list(): IConsulta\[] — Lista todas as consultas.
* update(id: string, data: Partial\<Omit\<IConsulta, "id" | "animalId">>): IConsulta | undefined — Atualiza consulta existente.
* delete(id: string): boolean — Remove consulta pelo ID.
* listByAnimal(animalId: string): IConsulta\[] — Lista consultas de um animal.

#### VacinaAplicadaModel

* create(data: Omit\<IVacinaAplicada, "id">, animalExistsFn: (id: string) => boolean, consultaExistsFn: (id: string) => boolean): IVacinaAplicada | undefined — Registra vacinação para animal e consulta válidos.
* read(id: string): IVacinaAplicada | undefined — Busca vacinação aplicada pelo ID.
* list(): IVacinaAplicada\[] — Lista todos os registros de vacina aplicada.
* update(id: string, data: Partial\<Omit\<IVacinaAplicada, "id" | "animalId" | "consultaId">>): IVacinaAplicada | undefined — Atualiza dados de vacinação aplicada.
* delete(id: string): boolean — Remove vacinação aplicada pelo ID.
* listByAnimal(animalId: string): IVacinaAplicada\[] — Lista vacinas aplicadas a um animal.
