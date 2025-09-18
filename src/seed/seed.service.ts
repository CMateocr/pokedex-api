import { Injectable } from '@nestjs/common'
import { PokeResponse } from './interfaces/poke-response.interface'
import { PokemonService } from 'src/pokemon/pokemon.service'
import { AxiosAdapter } from 'src/common/adapters/axios.adapter'

@Injectable()
export class SeedService {
  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _http: AxiosAdapter,
  ) {}

  async executeSeed(): Promise<string> {
    await this._pokemonService.removeAll()

    const data = await this._http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    )

    const pokemonDataRefactored = data.results.map(({ name, url }) => {
      const segments = url.split('/')
      const no = +segments[segments.length - 2]

      return {
        name,
        no,
        url,
      }
    })

    await this._pokemonService.createMany(pokemonDataRefactored)

    return 'Seed executed'
  }
}
