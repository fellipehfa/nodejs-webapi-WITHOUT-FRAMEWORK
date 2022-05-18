import { readFile, writeFile } from 'node:fs/promises'

export default class HeroRepository {
  constructor({
    file,
  }) {
    this.file = file;
  }

  async #currentFileContent() {
    const fileContent = await readFile(this.file);
    return JSON.parse(fileContent);
  }

  async find() {
    return await this.#currentFileContent();
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data)
    
    await writeFile(
      this.file,
      JSON.stringify(currentFile),
    )

    return data.id;
  }
}

// const heroRepository = new HeroRepository({
//   file: './src/database/data.json',
// });

// console.log(
//   await heroRepository.create({
//     id: 2,
//     name: 'Chapolin',  
//   }) 
// )

// console.log(
//   await heroRepository.find()
// );

// import { readFile, writeFile } from 'node:fs/promises'

// export default class HeroRepository {
//   constructor({
//     heroService,
//   }) {
//     this.heroService = heroService;
//   }

//   async find() {
//     const heroes = await this.heroService.find();
//     return heroes;
//   }

//   async create(data) {
//     const hero = await this.heroService.create(data);
//     return hero;
//   }
// }