**Descrição de alto nível do módulo**

Implementa a camada Controller responsável pelos fluxos de CRUD de Tutor, Animal, Consulta e VacinaAplicada, centralizando as regras de negócio e validações de cada entidade. Os controllers orquestram chamadas aos métodos públicos das Models, aplicando os padrões Template Method para padronização de operações e Strategy para variações de filtros e validações. Este módulo expõe métodos prontos para consumo pela View/API, garantindo integridade, clareza e desacoplamento da lógica de persistência.

---

**Lista dos métodos públicos acessíveis neste módulo**

TutorController
create(data: Omit\<ITutor, "id" | "ativo">): ITutor | { error: string } — Cria um novo tutor.
read(id: string): ITutor | { error: string } — Consulta tutor pelo ID.
list(): ITutor\[] — Lista todos os tutores.
update(id: string, data: Partial\<Omit\<ITutor, "id" | "ativo">>): ITutor | { error: string } — Atualiza campos de um tutor.
inactivate(id: string, hasAnimalsFn: (tutorId: string) => boolean): { success: boolean; error?: string } — Inativa tutor caso não tenha animais vinculados.

AnimalController
create(data: Omit\<IAnimal, "id" | "ativo">, tutorExistsFn: (id: string) => boolean): IAnimal | { error: string } — Cadastra animal vinculado a tutor existente.
read(id: string): IAnimal | { error: string } — Consulta animal pelo ID.
list(): IAnimal\[] — Lista todos os animais, com suporte a filtros customizados.
update(id: string, data: Partial\<Omit\<IAnimal, "id" | "tutorId" | "ativo">>): IAnimal | { error: string } — Atualiza campos permitidos do animal.
inactivate(id: string): { success: boolean; error?: string } — Inativa animal pelo ID.
listByTutor(tutorId: string): IAnimal\[] | { error: string } — Lista animais de determinado tutor.
setFilterStrategy(strategy: AnimalFilterStrategy): void — Define a estratégia de filtro para listagem de animais.

ConsultaController
create(data: Omit\<IConsulta, "id" | "encerrada">, animalExistsFn: (id: string) => boolean): IConsulta | { error: string } — Cadastra consulta para animal válido.
read(id: string): IConsulta | { error: string } — Consulta consulta pelo ID.
list(): IConsulta\[] — Lista todas as consultas, com suporte a filtros customizados.
update(id: string, data: Partial\<Omit\<IConsulta, "id" | "animalId">>): IConsulta | { error: string } — Atualiza campos permitidos da consulta.
delete(id: string): { success: boolean; error?: string } — Remove consulta pelo ID.
listByAnimal(animalId: string): IConsulta\[] | { error: string } — Lista consultas de um animal.
setFilterStrategy(strategy: ConsultaFilterStrategy): void — Define a estratégia de filtro para listagem de consultas.

VacinaAplicadaController
create(data: Omit\<IVacinaAplicada, "id">, animalExistsFn: (id: string) => boolean, consultaExistsFn: (id: string) => boolean): IVacinaAplicada | { error: string } — Cadastra vacina aplicada, exigindo animal e consulta válidos.
read(id: string): IVacinaAplicada | { error: string } — Consulta vacina aplicada pelo ID.
list(): IVacinaAplicada\[] — Lista todas as vacinas aplicadas, com suporte a filtros customizados.
update(id: string, data: Partial\<Omit\<IVacinaAplicada, "id" | "animalId" | "consultaId">>): IVacinaAplicada | { error: string } — Atualiza dados permitidos da vacina aplicada.
delete(id: string): { success: boolean; error?: string } — Remove evento de vacina aplicada pelo ID.
listByAnimal(animalId: string): IVacinaAplicada\[] | { error: string } — Lista vacinas aplicadas de um animal.
setFilterStrategy(strategy: VacinaAplicadaFilterStrategy): void — Define a estratégia de filtro para listagem de vacinas aplicadas.
