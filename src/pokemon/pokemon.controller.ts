import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'

import { PokemonService } from './pokemon.service'

import { CreatePokemonDto } from './dto/create-pokemon.dto'
import { UpdatePokemonDto } from './dto/update-pokemon.dto'
import { Pokemon } from './entities/pokemon.entity'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe'

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonService.create(createPokemonDto)
  }

  @Get()
  findAll(): string {
    return this.pokemonService.findAll()
  }

  @Get(':term')
  findOne(@Param('term') term: string): Promise<Pokemon | null> {
    return this.pokemonService.findOne(term)
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    return this.pokemonService.update(term, updatePokemonDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    return this.pokemonService.remove(id)
  }
}
