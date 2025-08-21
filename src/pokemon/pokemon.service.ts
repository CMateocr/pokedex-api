import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { isValidObjectId, Model } from 'mongoose'

import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'

import { Pokemon } from './entities/pokemon.entity'

@Injectable()
export class PokemonService {
  private existingCodes = new Map<number, string>()

  constructor(@InjectModel(Pokemon.name) private readonly _pokemonModel: Model<Pokemon>) {
    this.existingCodes.set(11000, 'Pokemon already exists')
  }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()
    try {
      const pokemonCreated = await this._pokemonModel.create(createPokemonDto)

      return pokemonCreated
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  findAll(): string {
    return `This action returns all pokemon`
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon | null = null

    if (!isNaN(+term)) {
      pokemon = await this._pokemonModel.findOne({ no: term })
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this._pokemonModel.findById(term)
    }

    if (!pokemon) {
      pokemon = await this._pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      })
    }

    if (!pokemon)
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`)

    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto): Promise<Pokemon> {
    const pokemon = await this.findOne(term)

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true })

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      } as Pokemon
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async remove(id: string): Promise<void> {
    const { deletedCount } = await this._pokemonModel.deleteOne({ _id: id })

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id "${id}" not found`)
  }

  private handleExceptions(error: any): never {
    const code: number = error.code || error.statusCode

    const msg = this.existingCodes.get(code) || 'Internal Server Error'

    throw new BadRequestException(`${msg} - ${JSON.stringify(error.keyValue)}`)
  }
}
